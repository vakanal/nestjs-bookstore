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
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dtos';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  getRoles(): Promise<ReadRoleDto[]> {
    return this.roleService.getAll();
  }

  @Get(':roleId')
  getRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<ReadRoleDto> {
    return this.roleService.get(roleId);
  }

  @Post()
  createRole(@Body() role: CreateRoleDto): Promise<ReadRoleDto> {
    return this.roleService.create(role);
  }

  @Patch(':roleId')
  updateRole(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() role: UpdateRoleDto,
  ): Promise<ReadRoleDto> {
    return this.roleService.update(roleId, role);
  }

  @Delete(':roleId')
  deleteRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<boolean> {
    return this.roleService.delete(roleId);
  }
}
