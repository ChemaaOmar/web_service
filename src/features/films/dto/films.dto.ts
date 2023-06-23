import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilmDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'The Shawshank Redemption',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @ApiProperty({
    type: 'string',
    required: true,
    example:
      'Deleniti aut in neque eius vero neque officiis aliquam veniam maiores rerum consequatur rerum expedita necessitatibus',
  })
  @IsString({ message: 'Synopsis must be a string' })
  @IsNotEmpty({ message: 'Synopsis is required' })
  synopsis: string;
  @ApiProperty({
    type: 'number',
    required: true,
    example: 1994,
  })
  @IsNumber({}, { message: 'Release year must be a number' })
  @IsNotEmpty({ message: 'Release year is required' })
  release_year: number;
  @ApiProperty({
    type: 'number',
    required: true,
    example: 1,
  })
  @IsNotEmpty({ message: 'Genre id is required' })
  @IsNumber({}, { message: 'Genre id must be a number' })
  genre_id: number;
  @ApiProperty({
    type: 'array',
    required: true,
    example: [1, 2, 3],
  })
  @IsNotEmpty({ message: 'Actor ids are required' })
  @IsArray({ message: 'Actor ids must be an array of actor ids' })
  actor_ids: number[];
}
