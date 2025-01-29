import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Play, PlaySchema } from './schemas/play.schema';
import { PlayService } from './play.service';
import { PlayController } from './play.controller';
import { GridFsService } from './dto/gridfs/gridfs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Play.name, schema: PlaySchema }]),
  ],
  controllers: [PlayController],
  providers: [PlayService, GridFsService],
  exports: [PlayService],
})
export class PlayModule {}