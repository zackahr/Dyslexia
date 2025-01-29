import { Controller, Post, Body, Put, Param, Delete, Get, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) { }

  @Post()
  async createGame(@Body() createGameDto: CreateGameDto) {
    return this.gameService.createGame(createGameDto);
  }

  @Put(':id')
  async updateGame(
    @Param('id') id: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gameService.updateGame(id, updateGameDto);
  }

  @Delete(':id')
  async deleteGame(@Param('id') id: string) {
    return this.gameService.deleteGame(id);
  }

  @Get()
  async getAllGames() {
    return this.gameService.findAllGames();
  }

  @Get(':id')
  async getGameById(@Param('id') id: string) {
    return this.gameService.findGameById(id);
  }

  // Upload PDF to a specific game
  @Post(':id/pdf')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the field name from the form data
  async uploadPdfToGame(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.gameService.uploadPdfToGame(id, file.buffer, file.originalname);
  }

  @Get('pdf/:pdfId')
  async getPdf(@Param('pdfId') pdfId: string, @Res() res: Response) {
    return this.gameService.streamPdf(pdfId, res); // Serve the PDF
  }

  // Remove PDF from a specific game

  @Delete(':id/pdf/:pdfId')
  async deletePdfFromGame(
    @Param('id') id: string,
    @Param('pdfId') pdfId: string,
  ) {
    return this.gameService.deletePdfFromGame(id, pdfId);
  }
}
