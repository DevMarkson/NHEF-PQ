import 'dotenv/config';
// src/scripts/seed.ts
import fs from 'fs';
import path from 'path';
import dbConnect from '../../../lib/dbConnect.ts';
import Question from '../../../models/Question.ts';

async function seedData() {
  await dbConnect();

  // Read the JSON file
  const filePath = path.join(process.cwd(), 'questions.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const questions = JSON.parse(jsonData);

  // Clear existing questions - DISABLED for additive seeding
  // await Question.deleteMany({});
  
  // Insert or Update questions (Additive/Upsert)
  for (const section of questions.sections) {
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
          image: section.image || question.image || "", // Clear image if not provided in JSON
        },
        { upsert: true, new: true }
      );
    }
  }

  console.log('Questions seeded successfully!');
  process.exit();
}

seedData().catch((err) => {
  console.error(err);
  process.exit(1);
});
