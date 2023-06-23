import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActorDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Brad',
  })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Pitt',
  })
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;
  @ApiProperty({
    type: 'string',
    required: true,
    example: '1963-12-18',
  })
  @IsNotEmpty({ message: 'Date of birth is required' })
  date_of_birth: Date;
  @ApiProperty({
    type: 'string',
    required: false,
    example: '2023-12-18',
  })
  @IsOptional()
  date_of_death?: Date;
}
