import 'dotenv/config';
import dbConnect from './src/lib/dbConnect';
import Question from './src/models/Question';
import fs from 'fs';

async function exportData() {
  await dbConnect();
  console.log('Connected to DB...');
  
  const questions = await Question.find({}).lean();
  console.log(`Found ${questions.length} questions.`);
  
  // Group by testSection
  const sectionsMap = new Map();
  for (const q of questions) {
    if (!sectionsMap.has(q.testSection)) {
      sectionsMap.set(q.testSection, {
        testSection: q.testSection,
        passage: q.passage || '',
        questions: []
      });
    }
    const section = sectionsMap.get(q.testSection);
    section.questions.push({
      number: q.number,
      content: q.content,
      options: q.options,
      answer: q.answer,
      image: q.image || '',
      explanation: q.explanation || '',
    });
  }
  
  const result = {
    sections: Array.from(sectionsMap.values())
  };
  
  fs.writeFileSync('questions_production_backup.json', JSON.stringify(result, null, 2));
  console.log('Exported to questions_production_backup.json');
  process.exit();
}

exportData().catch(err => {
  console.error(err);
  process.exit(1);
});
