import 'dotenv/config';
import { list } from '@vercel/blob';
import dbConnect from './src/lib/dbConnect';
import Question from './src/models/Question';
import fs from 'fs';
import path from 'path';

async function fixNumerical3() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('BLOB_READ_WRITE_TOKEN not found');
    process.exit(1);
  }

  // 1. Fetch relevant blobs
  console.log('Fetching Numerical 3 blobs...');
  const response = await list({ token, limit: 1000 });
  const num3Blobs = response.blobs.filter(b => b.pathname.includes('numerical-reasoning-3'));
  console.log(`Found ${num3Blobs.length} new blobs for Numerical 3.`);

  // 2. Load questions.json
  const questionsFile = 'questions.json';
  const data = JSON.parse(fs.readFileSync(questionsFile, 'utf-8'));
  const section = data.sections.find(s => s.testSection === 'Numerical Reasoning Test 3');

  if (!section) {
    console.error('Numerical Reasoning Test 3 not found in questions.json');
    process.exit(1);
  }

  // 3. Map blobs to questions (Numerical tests usually have 1 image per 5 questions)
  let updatedCount = 0;
  for (const question of section.questions) {
    const qNumber = parseInt(question.number.replace('Q', ''));
    if (isNaN(qNumber)) continue;
    
    // Grouping: Q1-Q5 -> 1, Q6-Q10 -> 2, Q11-Q15 -> 3, Q16-Q20 -> 4
    const groupNum = Math.ceil(qNumber / 5);
    const filename = `question-${groupNum}.jpg`;
    
    const blob = num3Blobs.find(b => b.pathname.toLowerCase().endsWith(filename.toLowerCase()));
    
    if (blob) {
      question.image = blob.url;
      updatedCount++;
    }
  }

  console.log(`Mapped ${updatedCount} questions to new cloud URLs.`);

  // 4. Save and Seed
  fs.writeFileSync(questionsFile, JSON.stringify(data, null, 2));
  console.log(`Updated ${questionsFile} locally.`);

  console.log('Seeding production database...');
  await dbConnect();
  for (const question of section.questions) {
    await Question.findOneAndUpdate(
      { testSection: section.testSection, number: question.number },
      { image: question.image || "" },
      { upsert: true }
    );
  }

  console.log('✅ Numerical Reasoning Test 3 fixed!');
  process.exit(0);
}

fixNumerical3().catch(console.error);
