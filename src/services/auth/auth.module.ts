import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from '~/controllers/auth/auth.controller';
import { DatabaseModule } from '../database/database.module';
import { User } from '~/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, DatabaseModule],
})
export class AuthModule {}
