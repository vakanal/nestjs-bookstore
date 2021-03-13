import { RoleType } from '../../roles/roletype.enum';

export interface IJwtPayload {
  id: number;
  username: string;
  email: string;
  roles: RoleType[];
  expire?: Date;
}
