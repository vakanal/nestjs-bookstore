import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserDetailsEntity } from '../users-details/user-details.entity';
import { RoleEntity } from '../roles/role.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this.userRepository.find({
      where: { status: 'ACTIVE' },
    });

    return users;
  }

  async get(id: number): Promise<UserEntity> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user: UserEntity = await this.userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const details = new UserDetailsEntity();
    user.details = details;

    const repo = getConnection().getRepository(RoleEntity);
    const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
    user.roles = [defaultRole];

    const savedUser: UserEntity = await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: number, user: UserEntity): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    const userExists: UserEntity = await this.userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!userExists) {
      throw new NotFoundException();
    }

    await this.userRepository.update(id, { status: 'INACTIVE' });
  }
}
