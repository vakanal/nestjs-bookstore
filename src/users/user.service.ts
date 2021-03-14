import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserDetailsEntity } from '../users-details/user-details.entity';
import { RoleRepository } from '../roles/role.repository';
import { RoleEntity } from '../roles/role.entity';
import { RoleType } from '../roles/roletype.enum';
import { EntityStatus } from '../shared/entity-status.enum';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this.userRepository.find({
      where: { status: EntityStatus.ACTIVE },
    });

    return users;
  }

  async get(id: number): Promise<UserEntity> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user: UserEntity = await this.userRepository.findOne(id, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const details = new UserDetailsEntity();
    user.details = details;

    const defaultRole: RoleEntity = await this.roleRepository.findOne({
      where: { name: RoleType.GENERAL },
    });
    user.roles = [defaultRole];

    const savedUser: UserEntity = await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: number, user: UserEntity): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    const userExist: UserEntity = await this.userRepository.findOne(id, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    await this.userRepository.update(id, { status: EntityStatus.INACTIVE });
  }

  async setRoleToUser(userId: number, roleId: number): Promise<void> {
    const userExist: UserEntity = await this.userRepository.findOne(userId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException('User does not exist');
    }

    const roleExist: RoleEntity = await this.roleRepository.findOne(roleId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!roleExist) {
      throw new NotFoundException('Role does not exist');
    }

    userExist.roles.push(roleExist);

    await this.userRepository.save(userExist);
  }
}
