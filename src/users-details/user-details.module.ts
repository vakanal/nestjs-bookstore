import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailsEntity } from './user-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetailsEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserDetailsModule {}
