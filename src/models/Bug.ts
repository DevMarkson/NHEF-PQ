// src/models/Bug.ts
import mongoose from 'mongoose';

const BugSchema = new mongoose.Schema({
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'fixed'], 
    default: 'pending' 
  },
  reply: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Bug || mongoose.model('Bug', BugSchema, 'bugs');
