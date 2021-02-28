import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserRepository } from './user.repository'; // ! OLD WAY
import { UserEntity } from './user.entity'; // ! NEW WAY

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class UsersModule {}
