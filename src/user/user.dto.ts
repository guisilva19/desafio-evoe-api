import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UserDTO {
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

  @ApiProperty({
    example: 'string',
  })
  @IsString()
  @IsNotEmpty()
  senha: string;
}

export class UserUpdateDTO {
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

export class UserUpdatePassDTO {
  @ApiProperty({
    example: 'string',
  })
  @IsString()
  @IsNotEmpty()
  senha_antiga: string;

  @ApiProperty({
    example: 'string',
  })
  @IsString()
  @IsNotEmpty()
  nova_senha: string;
}
