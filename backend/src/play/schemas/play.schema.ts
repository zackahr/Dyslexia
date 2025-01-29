import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Play extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Player', required: true })
  playerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Game', required: true })
  gameId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'fs.files', required: true })
  pdfId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  datePlayed: Date;

  @Prop()
  timeSpent?: number;

  @Prop({ type: Types.ObjectId, ref: 'fs.files' })
  videoId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'fs.files' })
  voiceId?: Types.ObjectId;

  @Prop()
  score?: number;
}

export const PlaySchema = SchemaFactory.createForClass(Play);