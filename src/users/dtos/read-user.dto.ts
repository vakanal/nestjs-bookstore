import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsEmail } from 'class-validator';
import { ReadUserDetailsDto } from '../../users-details/dtos';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsEmail()
  username: string;

  @Expose()
  @Type(() => ReadUserDetailsDto)
  details: ReadUserDetailsDto;
}
