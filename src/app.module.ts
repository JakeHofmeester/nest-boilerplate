import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';
import { DatabaseModule } from './services/database/database.module';
import { AuthModule } from './services/auth/auth.module';
import { UserModule } from './services/user/user.module';
import { TaskModule } from './services/task/task.module';

@Module({
  imports: [
    DatabaseModule,
    ControllersModule,
    AuthModule,
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
