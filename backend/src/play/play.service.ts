import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Play } from './schemas/play.schema';
import { CreatePlayDto } from './dto/create-play.dto';

@Injectable()
export class PlayService {
  constructor(@InjectModel(Play.name) private playModel: Model<Play>) {}

  async create(createPlayDto: CreatePlayDto): Promise<Play> {
    const createdPlay = new this.playModel(createPlayDto);
    return createdPlay.save();
  }

  async findAll(): Promise<Play[]> {
    return this.playModel.find()
      .populate('playerId')
      .populate('gameId')
      .exec();
  }
}