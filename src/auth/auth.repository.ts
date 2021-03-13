import { EntityRepository, getConnection, Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { UserEntity } from '../users/user.entity';
import { SignUpDto } from './dtos';
import { RoleRepository } from '../roles/role.repository';
import { RoleEntity } from '../roles/role.entity';
import { RoleType } from '../roles/roletype.enum';
import { UserDetailsEntity } from '../users-details/user-details.entity';

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {
  async signup(signup: SignUpDto) {
    const { username, email, password } = signup;

    const user = new UserEntity();
    user.username = username;
    user.email = email;

    const roleRepository: RoleRepository = getConnection().getRepository(
      RoleEntity,
    );
    const defaultRole: RoleEntity = await roleRepository.findOne({
      where: { name: RoleType.GENERAL },
    });
    user.roles = [defaultRole];

    const details = new UserDetailsEntity();
    user.details = details;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
  }
}
