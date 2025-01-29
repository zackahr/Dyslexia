import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Game } from './schemas/game.schema';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import * as mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { Readable } from 'stream';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class GameService implements OnModuleInit {
  private gridFSBucket?: GridFSBucket; // Make it optional

  constructor(@InjectModel('Game') private readonly gameModel: Model<Game>) {}

  // This method will run when the module is initialized
  async onModuleInit() {
    // Wait until the mongoose connection is established
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dyslexia');
    
    // Once the connection is established, initialize GridFSBucket
    this.gridFSBucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'pdfs',
    });
  }

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const newGame = new this.gameModel(createGameDto);
    return newGame.save();
  }

  async updateGame(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    return this.gameModel.findByIdAndUpdate(id, updateGameDto, { new: true });
  }

  async deleteGame(id: string): Promise<Game> {
    return this.gameModel.findByIdAndDelete(id);
  }

  async findAllGames(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  async findGameById(id: string): Promise<any> {
    const game = await this.gameModel.findById(id).exec();
    if (!game) {
      return null;
    }
  
    // Ensure gridFSBucket is initialized
    if (!this.gridFSBucket) {
      throw new Error('GridFSBucket not initialized');
    }
  
    // Fetch PDF details for each PDF ID
    const pdfsWithDetails = await Promise.all(
      game.pdfs.map(async (pdfId: mongoose.Types.ObjectId) => {
        const files = await this.gridFSBucket.find({ _id: pdfId }).toArray();
        if (files.length > 0) {
          return {
            id: pdfId.toString(),
            filename: files[0].filename,
          };
        } else {
          return { id: pdfId.toString(), filename: 'Unknown' };
        }
      })
    );
  
    return {
      ...game.toObject(),
      pdfs: pdfsWithDetails,
    };
  }

  // Upload PDF to GridFS
  async uploadPdfToGame(gameId: string, fileBuffer: Buffer, filename: string): Promise<Game> {
    const game = await this.gameModel.findById(gameId).exec();
    if (!game) {
      throw new Error('Game not found');
    }

    // Ensure gridFSBucket is initialized before using it
    if (!this.gridFSBucket) {
      throw new Error('GridFSBucket not initialized');
    }

    // Create GridFS stream for upload
    const uploadStream = this.gridFSBucket.openUploadStream(filename, {
      metadata: { gameId },
    });

    // Pipe the PDF buffer into the GridFS stream
    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);

    return new Promise((resolve, reject) => {
      uploadStream.on('finish', async () => {
        // Store the ObjectId reference (uploadStream.id) in pdfs array
        game.pdfs.push(new mongoose.Types.ObjectId(uploadStream.id));  // Ensure it is stored as ObjectId
        await game.save();
        resolve(game);
      });

      uploadStream.on('error', (err) => reject(err));
    });
  }

  // Remove PDF from the game
  async deletePdfFromGame(gameId: string, pdfId: string): Promise<Game | null> {
    const game = await this.gameModel.findById(gameId).exec();
    if (!game) {
      throw new Error('Game not found');
    }

    // Ensure the PDF ID is of type ObjectId
    const objectId = new mongoose.Types.ObjectId(pdfId);  // Create ObjectId from string

    const pdfIndex = game.pdfs?.indexOf(objectId); // Find by ObjectId

    if (pdfIndex === -1) {
      throw new Error('PDF not found');
    }

    game.pdfs.splice(pdfIndex, 1);

    // Ensure gridFSBucket is initialized before using it
    if (!this.gridFSBucket) {
      throw new Error('GridFSBucket not initialized');
    }

    // Remove the PDF file from GridFS
    await this.gridFSBucket.delete(objectId);

    await game.save();

    return game;
  }

  // Get the PDF URL (for frontend use)
  async getPdfUrl(pdfId: string): Promise<{ url: string }> {
    // Return the URL to the stored PDF in GridFS
    const url = `${process.env.BASE_URL || 'http://localhost:3000'}/game/pdf/${pdfId}`;
    return { url };
  }

  // Method to stream the PDF file (you will use this to serve the PDF)
  async streamPdf(pdfId: string, res: any): Promise<void> {
    // Ensure gridFSBucket is initialized before using it
    if (!this.gridFSBucket) {
      throw new Error('GridFSBucket not initialized');
    }

    const downloadStream = this.gridFSBucket.openDownloadStream(new mongoose.Types.ObjectId(pdfId));
    
    // Pipe the download stream directly to the response object
    downloadStream.pipe(res);

    downloadStream.on('error', (err) => {
      res.status(500).send('Error downloading PDF');
    });
  }
}
