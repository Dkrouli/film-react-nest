import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFilmDto {

  @IsInt()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  tags: string[];

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  cover?: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  description?: string;
  
  @IsInt()
  durationMinutes: number; 
  
  @IsString()
  release_date: string; 
}