import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/Task.entity';
import { CreateTaskDto } from '../../controllers/tasks/dto/create-task.dto';
import { UpdateTaskDto } from '../../controllers/tasks/dto/update-task.dto';
import { Express } from 'express';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, userId: number, file?: Express.Multer.File): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      attachment: file?.path,
      user: { id: userId },
    });
    return this.tasksRepository.save(task);
  }

  async getTasksByUser(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getTaskById(id: number, userId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto, userId: number, file?: Express.Multer.File): Promise<Task> {
    const task = await this.getTaskById(id, userId);
    Object.assign(task, updateTaskDto);
    if (file) {
      task.attachment = file.path;
    }
    return this.tasksRepository.save(task);
  }

  async deleteTask(id: number, userId: number): Promise<void> {
    const task = await this.getTaskById(id, userId);
    await this.tasksRepository.remove(task);
  }
} 