import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';
import { MapperService } from '../shared/mapper.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private mapperService: MapperService,
  ) {}

  async get(id: number): Promise<UserDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user: UserEntity = await this.usersRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this.mapperService.map<UserEntity, UserDto>(user, new UserDto());
  }

  async getAll(): Promise<UserDto[]> {
    const users: UserEntity[] = await this.usersRepository.find({
      where: { status: 'ACTIVE' },
    });

    return this.mapperService.mapCollection<UserEntity, UserDto>(
      users,
      new UserDto(),
    );
  }

  async createUser(user: UserEntity): Promise<UserDto> {
    const savedUser: UserEntity = await this.usersRepository.save(user);

    return this.mapperService.map<UserEntity, UserDto>(
      savedUser,
      new UserDto(),
    );
  }

  async updateUser(id: number, user: UserEntity): Promise<void> {
    await this.usersRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    const userExists: UserEntity = await this.usersRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!userExists) {
      throw new NotFoundException();
    }

    await this.usersRepository.update(id, { status: 'INACTIVE' });
  }
}
