import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Player extends Document {
  @Prop({ required: true })
  playerName: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ required: true })
  gender: string;

  @Prop()
  schoolName: string;

  @Prop()
  profile: string;

  @Prop()
  city: string;

  @Prop()
  parentName?: string;

  @Prop()
  phone?: string;

  @Prop()
  email?: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
