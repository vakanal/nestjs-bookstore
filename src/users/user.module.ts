import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { UserRepository } from './user.repository'; // ! OLD WAY
// import { UserEntity } from './user.entity'; // ! NEW WAY
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), SharedModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
