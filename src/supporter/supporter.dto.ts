import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class SupporterDTO {
  @ApiProperty({
    example: 'string',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'string',
  })
  @IsString()
  link: string;

  @ApiProperty({
    example: 'string',
  })
  @IsString()
  telefone: string;
}

export class SupporterUpdateDTO {
  @ApiProperty({
    example: 'string',
  })
  @IsString()
  @IsOptional()
  nome: string;

  @ApiProperty({
    example: 'string',
  })
  @IsString()
  @IsOptional()
  telefone: string;

  @ApiProperty({
    example: 'string',
  })
  @IsString()
  @IsOptional()
  link: string;
}
