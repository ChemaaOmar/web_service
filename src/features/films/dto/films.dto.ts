import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FilmDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @IsString({ message: 'Synopsis must be a string' })
  @IsNotEmpty({ message: 'Synopsis is required' })
  synopsis: string;
  @IsNumber({}, { message: 'Release year must be a number' })
  @IsNotEmpty({ message: 'Release year is required' })
  release_year: number;
  @IsNotEmpty()
  @IsNumber({}, { message: 'Genre id must be a number' })
  genre_id: number;
  @IsNotEmpty()
  @IsArray({ message: 'Actor ids must be an array of actor ids' })
  actor_ids: number[];
}
