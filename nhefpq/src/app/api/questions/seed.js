// src/scripts/seed.ts
import fs from 'fs';
import path from 'path';
import dbConnect from '../../../lib/dbConnect.js';
import Question from '../../../models/Question.js';

async function seedData() {
  await dbConnect();

  // Read the JSON file
  const filePath = path.join(process.cwd(), 'questions.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const questions = JSON.parse(jsonData);

  // Clear existing questions
  await Question.deleteMany({});
  
  // Insert questions
  for (const section of questions.sections) {
    for (const question of section.questions) {
      await Question.create({
        testSection: section.testSection,
        passage: section.passage,
        number: question.number,
        content: question.content,
        options: question.options,
        answer: question.answer,
        explanation: question.explanation,
      });
    }
  }

  console.log('Questions seeded successfully!');
  process.exit();
}

seedData().catch((err) => {
  console.error(err);
  process.exit(1);
});
