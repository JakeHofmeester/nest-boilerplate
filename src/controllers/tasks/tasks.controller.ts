import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Express } from 'express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { TasksService } from '../../services/tasks/tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { multerConfig } from '../../config/multer.config';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task has been successfully created.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('attachment', multerConfig))
  @ApiBody({ type: CreateTaskDto })
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.tasksService.createTask(createTaskDto, req.user.id, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for current user' })
  @ApiResponse({ status: 200, description: 'Return all tasks.' })
  async getTasks(@Request() req) {
    return this.tasksService.getTasksByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Return the task.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async getTask(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    return this.tasksService.getTaskById(id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('attachment', multerConfig))
  @ApiBody({ type: UpdateTaskDto })
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto, req.user.id, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    await this.tasksService.deleteTask(id, req.user.id);
    return { message: 'Task deleted successfully' };
  }
} 