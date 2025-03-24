// src/models/Question.ts
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  testSection: { type: String, required: true }, // Section name (e.g., "VERBAL REASONING TEST 1" or "Abstract Reasoning Test 1")
  instructions: { type: String }, // Instructions for the test (if applicable)
  passage: { type: String }, // The passage text (if applicable)
  number: { type: String, required: true }, // The question number (e.g., "Q1")
  content: { type: String, required: true }, // The question text
  image: { type: String }, // Path to the image (if applicable)
  options: { type: [String], required: true }, // Array of options
  answer: { type: String, required: true }, // Correct answer
  explanation: { type: String }, // Explanation for the answer
  rules: { type: [String] }, // Array of rules (specific to abstract reasoning)
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);