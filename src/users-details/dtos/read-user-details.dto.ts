import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadUserDetailsDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  lastname: string;
}
