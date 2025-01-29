import { Controller, Post, Body, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlayService } from './play.service';
import { CreatePlayDto } from './dto/create-play.dto';
import { Play } from './schemas/play.schema';
import { GridFsService } from './dto/gridfs/gridfs.service';

@Controller('plays')
export class PlayController {
  constructor(
    private readonly playService: PlayService,
    private readonly gridFsService: GridFsService
    ) {}

  @Post()
  async create(@Body() createPlayDto: CreatePlayDto): Promise<Play> {
    return this.playService.create(createPlayDto);
  }

  @Get()
  async findAll(): Promise<Play[]> {
    return this.playService.findAll();
  }

  @Post('upload-video')
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    const fileId = await this.gridFsService.uploadFile(file);
    return { videoId: fileId };
  }

  @Post('upload-voice')
  @UseInterceptors(FileInterceptor('voice'))
  async uploadVoice(@UploadedFile() file: Express.Multer.File) {
    const fileId = await this.gridFsService.uploadFile(file);
    return { voiceId: fileId };
  }
}