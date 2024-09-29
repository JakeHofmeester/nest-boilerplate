import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
//import swagger

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  // figure out swagger shizzle

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
