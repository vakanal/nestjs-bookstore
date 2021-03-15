import { IsNumber, IsEmail } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDetailsDto } from '../../users-details/dtos';
import { ReadRoleDto } from '../../roles/dtos';

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

  @Expose()
  @Type(() => ReadRoleDto)
  roles: ReadRoleDto[];
}
