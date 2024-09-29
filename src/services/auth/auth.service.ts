import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '~/entities/users.entity';
import { SignupDto } from '~/controllers/auth/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>
  ) {}

  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);

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
  }

  signin() {
    return { message: 'I am signed in' };
  }
}
