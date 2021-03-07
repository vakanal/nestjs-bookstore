import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from './role.entity';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getRoles(): Promise<RoleEntity[]> {
    const roles = await this.roleService.getAll();

    return roles;
  }

  @Get(':id')
  async getRole(@Param('id', ParseIntPipe) id: number): Promise<RoleEntity> {
    const role = await this.roleService.get(id);

    return role;
  }

  @Post()
  async createRole(@Body() role: RoleEntity): Promise<RoleEntity> {
    const createdRole = await this.roleService.create(role);

    return createdRole;
  }

  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: RoleEntity,
  ): Promise<boolean> {
    await this.roleService.update(id, role);

    return true;
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    await this.roleService.delete(id);

    return true;
  }
}
