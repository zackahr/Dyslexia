import { IsString, IsOptional, IsArray } from 'class-validator';
import { IsMongoId } from 'class-validator';  // Add IsMongoId validator

export class UpdateGameDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })  // Validate each item as a valid MongoDB ObjectId
  pdfs?: string[];  // Store an array of MongoDB ObjectId references (as strings)
}
