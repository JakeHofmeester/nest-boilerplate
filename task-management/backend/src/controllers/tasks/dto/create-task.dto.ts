import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Complete project documentation' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Write detailed documentation for the API endpoints' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2024-12-31T23:59:59Z' })
  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'File attachment (max 2MB, allowed: png, jpg, jpeg, pdf)'
  })
  @IsOptional()
  attachment?: any;
} 