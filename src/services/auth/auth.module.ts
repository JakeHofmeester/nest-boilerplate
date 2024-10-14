import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from '~/controllers/auth/auth.controller';
import { DatabaseModule } from '../database/database.module';
import { User } from '~/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, DatabaseModule, JwtStrategy],
})
export class AuthModule {}
