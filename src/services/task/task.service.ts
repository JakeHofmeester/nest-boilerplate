import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '~/controllers/task/dto/task.dto';
import { Task } from '~/entities/tasks.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const newTask = this.taskRepository.create({
      title: dto.title,
      description: dto.description,
      //    assignee: dto.assignee, ERROR WHYYYYYYY??????????????? :(
      dueDate: dto.dueDate,
      fileUrl: dto.fileUrl,
    });
    return await this.taskRepository.save(newTask);
  }
}
