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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/roles/decorators/role.decorator';
import { RoleGuard } from '../roles/guards/role.guard';
import { RoleType } from '../roles/roletype.enum';
import { ReadUserDto, UpdateUserDto } from './dtos';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers(): Promise<ReadUserDto[]> {
    return this.userService.getAll();
  }

  @Get(':userId')
  @Roles(RoleType.ADMINISTRATOR, RoleType.AUTHOR)
  @UseGuards(JwtAuthGuard, RoleGuard)
  getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto> {
    return this.userService.get(userId);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: UpdateUserDto,
  ): Promise<ReadUserDto> {
    return this.userService.update(userId, user);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<boolean> {
    return this.userService.delete(userId);
  }

  @Post('setRole')
  setRoleToUser(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('roleId', ParseIntPipe) roleId: number,
  ): Promise<boolean> {
    return this.userService.setRoleToUser(userId, roleId);
  }
}
