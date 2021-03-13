import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { UserEntity } from '../users/user.entity';
import { SignUpDto, SignInDto } from './dtos';
import { compare } from 'bcrypt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { RoleType } from '../roles/roletype.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async signup(signUpDto: SignUpDto): Promise<void> {
    const { username, email } = signUpDto;

    const userExits: UserEntity = await this.authRepository.findOne({
      where: [{ username }, { email }],
    });

    if (userExits) {
      throw new ConflictException('username or email already exists');
    }

    return this.authRepository.signup(signUpDto);
  }

  async signin(signinDto: SignInDto): Promise<{ token: string }> {
    const { username, password } = signinDto;

    const user: UserEntity = await this.authRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('user does not exist');
    }

    const isMatch: boolean = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload: IJwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles.map((role) => role.name as RoleType),
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
