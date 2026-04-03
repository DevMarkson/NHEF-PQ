import 'dotenv/config';
import { list } from '@vercel/blob';
import fs from 'fs';

async function mapBlobs() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('BLOB_READ_WRITE_TOKEN not found in .env');
    process.exit(1);
  }

  console.log('Fetching blob list...');
  let allBlobs = [];
  let hasMore = true;
  let cursor = undefined;

  while (hasMore) {
    const response = await list({ cursor, token });
    allBlobs = allBlobs.concat(response.blobs);
    hasMore = response.hasMore;
    cursor = response.cursor;
  }

  console.log(`Found ${allBlobs.length} blobs.`);

  // Load the exported questions
  const jsonData = JSON.parse(fs.readFileSync('questions_production_backup.json', 'utf-8'));
  
  let mappedCount = 0;
  let missingCount = 0;

  for (const section of jsonData.sections) {
    for (const question of section.questions) {
      if (question.image && !question.image.startsWith('http')) {
        const localPath = question.image;
        // Clean the local path for matching (e.g., remove leading slash)
        const cleanPath = localPath.startsWith('/') ? localPath.substring(1) : localPath;
        
        // Find a blob that ends with the clean path or filename
        const blob = allBlobs.find(b => b.pathname.endsWith(cleanPath));
        
        if (blob) {
          question.image = blob.url;
          mappedCount++;
        } else {
          console.warn(`Could not find blob for: ${localPath}`);
          missingCount++;
        }
      }
    }
  }

  fs.writeFileSync('questions_with_blobs.json', JSON.stringify(jsonData, null, 2));
  console.log(`\nMapping complete:`);
  console.log(`- Mapped: ${mappedCount}`);
  console.log(`- Missing: ${missingCount}`);
  console.log('Result saved to questions_with_blobs.json');
}

mapBlobs().catch(err => {
  console.error(err);
  process.exit(1);
});
