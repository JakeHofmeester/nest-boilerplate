import { Module } from '@nestjs/common';
import { ExampleControllerModule } from './example/example.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [ExampleControllerModule],
  controllers: [UserController],
})
export class ControllersModule {}
