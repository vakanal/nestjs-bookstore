import config from '../config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../config/services/typeorm-config.service';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './books/book.module';
import { RoleModule } from './roles/role.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    BookModule,
    RoleModule,
    UserModule,
  ],
})
export class AppModule {}
