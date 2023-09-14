import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';

  export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @MinLength(8)
    @IsString()
    password: string;
  }
  
  export class SignUpDto extends SignInDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;
  }
  