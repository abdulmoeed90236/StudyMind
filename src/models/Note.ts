import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  userEmail?: string;
  subject: string;
  title: string;
  rawText: string;
  summary: {
    keyTakeaways: string[];
    coreVocabulary: string[];
  };
  eli5Explanation: string;
  flashcards: Array<{
    question: string;
    answer: string;
    difficulty: string;
  }>;
  createdAt: Date;
}

const NoteSchema = new Schema<INote>({
  userEmail: { type: String, required: false, index: true },
  subject: { type: String, required: true },
  title: { type: String, required: true },
  rawText: { type: String, required: true },
  summary: {
    keyTakeaways: [{ type: String }],
    coreVocabulary: [{ type: String }],
  },
  eli5Explanation: { type: String, default: '' },
  flashcards: [
    {
      question: { type: String },
      answer: { type: String },
      difficulty: { type: String, default: 'Medium' },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Note = (mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema)) as mongoose.Model<INote>;
