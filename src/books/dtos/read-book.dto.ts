import { IsNumber, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDto } from '../../users/dtos/read-user.dto';

@Exclude()
export class ReadBookDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @Type(() => ReadUserDto)
  authors: ReadUserDto[];
}
