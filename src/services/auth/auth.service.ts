import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '~/entities/users.entity';
import { SignupDto, SigninDto } from '~/controllers/auth/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);

    try {
      const newUser = this.user.create({
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        password: hash,
      });

      const savedUser = await this.user.save(newUser);

      const access_token = await this.signToken(savedUser.id, savedUser.email);

      return {
        message: 'Successfully registered',
        access_token,
      };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('UNIQUE constraint failed')
      ) {
        throw new ForbiddenException('Email already exists');
      }
      throw error;
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.user.findOne({ where: { email: dto.email } });

    if (!user) {
      throw new UnauthorizedException('No user found with this email address.');
    }

    const PwMatch = await argon.verify(user.password, dto.password);

    if (!PwMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    const access_token = await this.signToken(user.id, user.email);

    return {
      access_token,
    };
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return token;
  }
}
