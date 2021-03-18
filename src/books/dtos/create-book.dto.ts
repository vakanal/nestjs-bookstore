import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: 'This name is not valid' })
  name: string;

  @IsString()
  @MaxLength(500, { message: 'This description is not valid' })
  description: string;

  @IsNotEmpty()
  authors: number[];
}
