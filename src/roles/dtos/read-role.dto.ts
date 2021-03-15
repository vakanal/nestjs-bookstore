import { IsNumber, IsString, MaxLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadRoleDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This name is not valid' })
  name: string;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This description is not valid' })
  description: string;
}
