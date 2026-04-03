import 'dotenv/config';
import { list } from '@vercel/blob';
import dbConnect from './src/lib/dbConnect';
import Question from './src/models/Question';
import fs from 'fs';
import path from 'path';

async function migrateImagesToBlob() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('BLOB_READ_WRITE_TOKEN not found in .env');
    process.exit(1);
  }

  // 1. Fetch all blobs
  console.log('Fetching all blobs from Vercel...');
  let allBlobs = [];
  let response = await list({ token });
  allBlobs = allBlobs.concat(response.blobs);
  while (response.hasMore) {
    response = await list({ cursor: response.cursor, token });
    allBlobs = allBlobs.concat(response.blobs);
  }
  console.log(`Found ${allBlobs.length} blobs in storage.`);

  // 2. Load the exported questions (Truth Source)
  const backupFile = 'questions_production_backup.json';
  if (!fs.existsSync(backupFile)) {
    console.error(`Error: ${backupFile} not found! Run export_db.ts first.`);
    process.exit(1);
  }
  const jsonData = JSON.parse(fs.readFileSync(backupFile, 'utf-8'));
  console.log(`Loaded ${jsonData.sections.length} sections from backup.`);

  // 3. Map local paths to Blob URLs
  let mappedCount = 0;
  let skippedCount = 0;
  let notFoundCount = 0;

  for (const section of jsonData.sections) {
    for (const question of section.questions) {
      const currentImage = question.image;
      
      if (!currentImage) {
        skippedCount++;
        continue;
      }

      // Clean path: handle legacy absolute URLs and leading slashes
      let cleanPath = currentImage.replace('https://nhefpq.vercel.app/', '');
      cleanPath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
      
      // If it's still an external URL (e.g. from another domain), skip it
      if (cleanPath.startsWith('http')) {
        skippedCount++;
        continue;
      }
      
      // Try to find a blob that matches the path or filename
      const filename = path.basename(cleanPath);
      const folder = path.dirname(cleanPath);
      
      let blob = allBlobs.find(b => {
          const decodedP = decodeURIComponent(b.pathname);
          return decodedP === cleanPath || decodedP.toLowerCase() === cleanPath.toLowerCase();
      });
      
      if (!blob) {
        // Fuzzy match: just filename (ignoring parent folder)
        blob = allBlobs.find(b => {
             const decodedP = decodeURIComponent(b.pathname);
             return path.basename(decodedP).toLowerCase() === filename.toLowerCase();
        });
      }

      if (blob) {
        question.image = blob.url;
        mappedCount++;
      } else {
        console.warn(`[MISSING] Could not find blob for: ${currentImage}`);
        notFoundCount++;
      }
    }
  }

  console.log(`\nMapping Summary:`);
  console.log(`- Successfully mapped: ${mappedCount}`);
  console.log(`- Already absolute/skipped: ${skippedCount}`);
  console.log(`- Still missing: ${notFoundCount}`);

  // 4. Save the new source of truth
  const finalJsonFile = 'questions.json';
  fs.writeFileSync(finalJsonFile, JSON.stringify(jsonData, null, 2));
  console.log(`\nUpdated ${finalJsonFile} with absolute Blob URLs.`);

  // 5. Seed the database
  console.log('\nSeeding database with updated URLs...');
  await dbConnect();
  
  for (const section of jsonData.sections) {
    for (const question of section.questions) {
       await Question.findOneAndUpdate(
        { 
          testSection: section.testSection, 
          number: question.number 
        },
        {
          testSection: section.testSection,
          passage: section.passage,
          number: question.number,
          content: question.content,
          options: question.options,
          answer: question.answer,
          explanation: question.explanation,
          image: question.image || "", 
        },
        { upsert: true, new: true }
      );
    }
  }

  console.log('\n✅ Database synchronization complete!');
  process.exit(0);
}

migrateImagesToBlob().catch(err => {
  console.error('Error during migration:', err);
  process.exit(1);
});
