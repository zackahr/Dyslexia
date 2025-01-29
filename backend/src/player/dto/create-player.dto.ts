import { IsString, IsOptional, IsDateString, IsPhoneNumber, IsEmail } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  playerName: string;

  @IsDateString()
  birthday: string;

  @IsString()
  gender: string;

  @IsString()
  schoolName: string;

  @IsString()
  profile: string;

  @IsString()
  city: string;

  @IsString()
  parentName: string;

  @IsOptional() // Optional fields
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
