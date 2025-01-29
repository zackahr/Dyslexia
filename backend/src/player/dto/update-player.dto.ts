import { IsString, IsOptional, IsDateString, IsPhoneNumber, IsEmail } from 'class-validator';

export class UpdatePlayerDto {
    @IsOptional()
    @IsString()
    playerName?: string;

    @IsOptional()
    @IsDateString()
    birthday?: string;

    @IsOptional()
    @IsString()
    gender?: string;

    @IsOptional()
    @IsString()
    schoolName?: string;

    @IsOptional()
    @IsString()
    profile?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    parentName?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}
