import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailsRepository } from './user-details.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetailsRepository])],
  exports: [TypeOrmModule],
})
export class UserDetailsModule {}
