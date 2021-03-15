import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RoleRepository } from './role.repository';
import { RoleEntity } from './role.entity';
import { EntityStatus } from '../shared/entity-status.enum';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dtos';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async getAll(): Promise<ReadRoleDto[]> {
    const roles: RoleEntity[] = await this.roleRepository.find({
      where: { status: EntityStatus.ACTIVE },
    });

    return roles.map((role) => plainToClass(ReadRoleDto, role));
  }

  async get(roleId: number): Promise<ReadRoleDto> {
    if (!roleId) {
      throw new BadRequestException('roleId must be sent');
    }

    const role: RoleEntity = await this.roleRepository.findOne(roleId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return plainToClass(ReadRoleDto, role);
  }

  async create(role: CreateRoleDto): Promise<ReadRoleDto> {
    const savedRole: RoleEntity = await this.roleRepository.save(role);

    return plainToClass(ReadRoleDto, savedRole);
  }

  async update(roleId: number, role: UpdateRoleDto): Promise<ReadRoleDto> {
    const foundRole = await this.roleRepository.findOne(roleId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!foundRole) {
      throw new NotFoundException();
    }

    foundRole.name = role?.name;
    foundRole.description = role?.description;

    const updatedRole = await this.roleRepository.save(foundRole);

    return plainToClass(ReadRoleDto, updatedRole);
  }

  async delete(roleId: number): Promise<boolean> {
    const roleExists: RoleEntity = await this.roleRepository.findOne(roleId, {
      where: { status: EntityStatus.ACTIVE },
    });

    if (!roleExists) {
      throw new NotFoundException();
    }

    await this.roleRepository.update(roleId, { status: EntityStatus.INACTIVE });

    return true;
  }
}
