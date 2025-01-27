import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from '../controllers/tasks/tasks.controller';
import { TasksService } from '../services/tasks/tasks.service';
import { Task } from '../entities/Task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {} 