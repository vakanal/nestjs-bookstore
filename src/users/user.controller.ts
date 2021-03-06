import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(@Param() id: number): Promise<UserDto> {
    const user = await this._userService.get(id);
    return user;
  }

  @Get()
  async getUsers(): Promise<UserDto[]> {
    const users = await this._userService.getAll();
    return users;
  }

  @Post()
  async createUser(@Body() user: UserEntity): Promise<UserDto> {
    const createdUser = await this._userService.createUser(user);
    return createdUser;
  }

  @Patch()
  async updateUser(
    @Param() id: number,
    @Body() user: UserEntity,
  ): Promise<boolean> {
    await this._userService.updateUser(id, user);
    return true;
  }

  @Delete(':id')
  async deleteUser(@Param() id: number): Promise<boolean> {
    await this._userService.deleteUser(id);
    return true;
  }
}
