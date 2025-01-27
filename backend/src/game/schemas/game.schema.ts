import { Schema, Document, Types } from 'mongoose';

export interface Game extends Document {
  name: string;
  date: Date;
  pdfs?: Types.ObjectId[];  // Store ObjectId instead of string
}

export const GameSchema = new Schema<Game>({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  pdfs: { type: [Schema.Types.ObjectId], ref: 'fs.files', required: false },  // Reference to GridFS files
});
