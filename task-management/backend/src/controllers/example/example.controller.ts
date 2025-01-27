import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExampleService } from '../../services/example/example.service';
import {
  CreateExampleRequestDto,
  CreateExampleResponseDto,
} from './dto/CreateExample.dto';

@ApiTags('example')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  async findAll(): Promise<CreateExampleResponseDto[]> {
    return this.exampleService.findAll();
  }

  @Post()
  async create(
    @Body() createExampleDto: CreateExampleRequestDto,
  ): Promise<CreateExampleResponseDto> {
    return this.exampleService.create(createExampleDto);
  }
}
