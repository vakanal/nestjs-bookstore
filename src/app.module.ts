import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';
import configuration, { IConfig } from './config/configuration';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService<IConfig>) =>
        Object.assign(await getConnectionOptions(), {
          host: config.get<string>('host'),
          username: config.get<string>('username'),
          password: config.get<string>('password'),
          database: config.get<string>('database'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'], // ! or "dist/**/*.entity{.ts,.js}"
          migrations: [__dirname + '/migrations/*.{.ts,.js}'],
          autoLoadEntities: true,
        }),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
