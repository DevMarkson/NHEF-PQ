// src/models/Question.ts
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  testSection: String, // Section name (e.g., "VERBAL REASONING TEST 1")
  passage: String, // The passage text (if applicable)
  number: String, // The question number
  content: String, // The question text
  options: [String], // Array of options
  answer: String, // Correct answer
  explanation: String, // Explanation
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);