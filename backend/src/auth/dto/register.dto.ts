import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsEmail,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'First Name' })
    firstName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ default: 'Last Name' })
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ default: 'user@example.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'password' })
    password: string;
  }