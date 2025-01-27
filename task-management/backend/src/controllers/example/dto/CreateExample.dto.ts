import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExampleRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class CreateExampleResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
} 