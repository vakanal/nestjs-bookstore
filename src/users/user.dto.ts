import { IsNotEmpty } from 'class-validator';
import { UserDetailsEntity } from '../users-details/user-details.entity';
import { RoleType } from '../roles/roletype.enum';

export class UserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  details: UserDetailsEntity;

  @IsNotEmpty()
  roles: RoleType;
}
