import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Example } from '../../entities/Example.entity';
import { Repository } from 'typeorm';
import { CreateExampleRequestDto } from '../../controllers/example/dto/CreateExample.dto';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
  ) {}

  async findAll(): Promise<Example[]> {
    return this.exampleRepository.find();
  }

  async create(createExampleDto: CreateExampleRequestDto): Promise<Example> {
    const example = this.exampleRepository.create(createExampleDto);
    return this.exampleRepository.save(example);
  }
}
