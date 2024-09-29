import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '~/entities/users.entity';
import { SignupDto, SigninDto } from '~/controllers/auth/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>
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

      delete newUser.password;

      return {
        message: 'Successfully registered',
        user: {
          id: savedUser.id,
          ...savedUser,
        },
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
    // find the user by email
    const user = await this.user.findOne({ where: { email: dto.email } });
    //if user does not exist throw exception
    if (!user) {
      throw new UnauthorizedException('No user found with this email address.');
    }
    // compare passwords
    const PwMatch = await argon.verify(user.password, dto.password);
    //if password incorrect throw exception
    if (!PwMatch) {
      throw new UnauthorizedException('Incorrect password');
    }
    //send back the user
    delete user.password;
    return {
      message: 'Login successful',
      user: {
        id: user.id,
        ...user,
      },
    };
  }
}
