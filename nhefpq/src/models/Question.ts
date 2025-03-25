// src/models/Question.ts
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  testSection: { type: String, required: true }, // Section name
  instructions: { type: String }, // Test instructions
  passage: { type: String }, // Passage text (if applicable)
  number: { type: String, required: true }, // Question number (e.g., "Q1")
  content: { type: String, required: true }, // Question text
  image: { type: String }, // Path to the question image (if applicable)
  options: { type: [String], required: true }, // Array of answer choices
  answer: { type: String, required: true }, // Correct answer
  explanation: { type: String }, // Explanation for the answer
  rules: { type: [String] }, // Rules for abstract reasoning questions (if applicable)

  // New fields for numerical reasoning
  steps: { type: [String] }, // Step-by-step breakdown
  calculations: [
    {
      type: {
        description: String,
        formula: String,
        unit: String
      }
    }
  ], // List of calculations
  final_calculations: [
    {
      type: {
        description: String,
        formula: String,
        unit: String
      }
    }
  ], // Final calculations
  table: {
    headers: [String], // Table column headers
    rows: [
      {
        type: Map, // Each row can have different fields (e.g., Year, Revenue)
        of: String
      }
    ]
  } // Table for numerical questions
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);
