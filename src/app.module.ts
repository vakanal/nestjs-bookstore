// import configuration from '../config/configuration'; // * dotenv mode
import config from '../config/config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../config/TypeOrmConfigService';
import { UserModule } from './users/user.module';
import { RoleModule } from './roles/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
      // load: [configuration], // * dotenv mode
      // envFilePath: ['.env.development'], // * dotenv mode
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
