import { Injectable } from '@nestjs/common';
import { AuthOptionsFactory, AuthModuleOptions } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService implements AuthOptionsFactory {
  constructor(private configService: ConfigService) {}

  createAuthOptions(): AuthModuleOptions {
    return this.configService.get('configuration.auth');
  }
}
