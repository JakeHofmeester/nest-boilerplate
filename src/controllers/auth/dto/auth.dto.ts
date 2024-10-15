import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Must be a valid email',
    example: 'johndoe@email.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'password', example: 'SuperSecret!' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'firstname', example: 'John' })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'lastname', example: 'Doe' })
  lastname: string;
}

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'email', example: 'johndoe@email.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'password', example: 'SuperSecret!' })
  password: string;
}
