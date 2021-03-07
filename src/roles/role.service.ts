import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async getAll(): Promise<RoleEntity[]> {
    const roles: RoleEntity[] = await this.roleRepository.find({
      where: { status: 'ACTIVE' },
    });

    return roles;
  }

  async get(id: number): Promise<RoleEntity> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const role: RoleEntity = await this.roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  async create(role: RoleEntity): Promise<RoleEntity> {
    const savedRole: RoleEntity = await this.roleRepository.save(role);

    return savedRole;
  }

  async update(id: number, role: RoleEntity): Promise<void> {
    await this.roleRepository.update(id, role);
  }

  async delete(id: number): Promise<void> {
    const roleExists: RoleEntity = await this.roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!roleExists) {
      throw new NotFoundException();
    }

    await this.roleRepository.update(id, { status: 'INACTIVE' });
  }
}
