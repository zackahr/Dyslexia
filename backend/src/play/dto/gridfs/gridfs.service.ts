import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GridFSBucket } from 'mongodb';

@Injectable()
export class GridFsService {
  private gridFs: GridFSBucket;

  constructor(@InjectConnection() private connection: Connection) {
    this.gridFs = new GridFSBucket(this.connection.db, {
      bucketName: 'fs',
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const writeStream = this.gridFs.openUploadStream(file.originalname);
      writeStream.write(file.buffer);
      writeStream.end(() => resolve(writeStream.id.toString()));
      writeStream.on('error', reject);
    });
  }
}