import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { RoleRepository } from '../roles/role.repository';
import { RoleEntity } from '../roles/role.entity';
import { EntityStatus } from '../shared/entity-status.enum';
import { ReadUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  async getAll(): Promise<ReadUserDto[]> {
    const users: UserEntity[] = await this.userRepository.find({
      where: { status: EntityStatus.ACTIVE },
    });

    return users.map((user) => plainToClass(ReadUserDto, user));
  }

  async get(userId: number): Promise<ReadUserDto> {
    if (!userId) {
      throw new BadRequestException('userId must be sent');
    }

    const user: UserEntity = await this.userRepository.findOne(userId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(ReadUserDto, user);
  }

  async update(userId: number, user: UpdateUserDto): Promise<ReadUserDto> {
    const foundUser = await this.userRepository.findOne(userId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    foundUser.username = user.username;

    const updatedUser = await this.userRepository.save(foundUser);

    return plainToClass(ReadUserDto, updatedUser);
  }

  async delete(userId: number): Promise<boolean> {
    const userExist: UserEntity = await this.userRepository.findOne(userId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    await this.userRepository.update(userId, { status: EntityStatus.INACTIVE });

    return true;
  }

  async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
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

    return true;
  }
}
