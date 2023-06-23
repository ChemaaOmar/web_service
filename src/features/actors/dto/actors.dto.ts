import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ActorDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  first_name: string;
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;
  @IsNotEmpty({ message: 'Date of birth is required' })
  date_of_birth: Date;
  @IsOptional()
  date_of_death?: Date;
}
