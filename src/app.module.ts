// import configOld from '../config/config.old'; // * dotenv mode
import config from '../config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../config/services/typeorm-config.service';
import { UserModule } from './users/user.module';
import { RoleModule } from './roles/role.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
      // envFilePath: ['.env.development'], // * dotenv mode
      // load: [configuration], // * dotenv mode
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
