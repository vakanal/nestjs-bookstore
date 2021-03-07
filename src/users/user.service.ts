import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import { MapperService } from '../shared/mapper.service';
import { UserRepository } from './user.repository';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserDetailsEntity } from '../users-details/user-details.entity';
import { RoleEntity } from '../roles/role.entity';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private mapperService: MapperService,
  ) {}

  async getAll(): Promise<UserDto[]> {
    const users: UserEntity[] = await this.userRepository.find({
      where: { status: 'ACTIVE' },
    });

    return this.mapperService.mapCollection<UserEntity, UserDto>(
      users,
      new UserDto(),
    );
  }

  async get(id: number): Promise<UserDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user: UserEntity = await this.userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this.mapperService.map<UserEntity, UserDto>(user, new UserDto());
  }

  async create(user: UserEntity): Promise<UserDto> {
    const details = new UserDetailsEntity();
    user.details = details;

    const repo = getConnection().getRepository(RoleEntity);
    const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
    user.roles = [defaultRole];

    const savedUser: UserEntity = await this.userRepository.save(user);

    return this.mapperService.map<UserEntity, UserDto>(
      savedUser,
      new UserDto(),
    );
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
