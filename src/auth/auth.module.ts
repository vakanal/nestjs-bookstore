import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './auth.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthConfigService } from '../../config/services/auth-config.service';
import { JwtConfigService } from '../../config/services/jwt-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.registerAsync({
      useClass: AuthConfigService,
    }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtStrategy],
  exports: [TypeOrmModule, PassportModule, JwtModule],
})
export class AuthModule {}
