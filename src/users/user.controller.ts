import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/roles/decorators/role.decorator';
import { RoleGuard } from '../roles/guards/role.guard';
import { RoleType } from '../roles/roletype.enum';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<UserEntity[]> {
    const users = await this.userService.getAll();
    return users;
  }

  @Get(':id')
  @Roles(RoleType.ADMINISTRATOR, RoleType.AUTHOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    const user = await this.userService.get(id);
    return user;
  }

  @Post()
  async createUser(@Body() user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.userService.create(user);
    return createdUser;
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserEntity,
  ): Promise<boolean> {
    await this.userService.update(id, user);
    return true;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    await this.userService.delete(id);
    return true;
  }

  @Post('setRole')
  async setRoleToUser(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('roleId', ParseIntPipe) roleId: number,
  ) {
    return this.userService.setRoleToUser(userId, roleId);
  }
}
