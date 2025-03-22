import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SupporterDTO, SupporterUpdateDTO } from './supporter.dto';
import { SupporterService } from './supporter.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiTags('Apoiadores')
@Controller('supporters')
export class SupporterController {
  constructor(private readonly supporterService: SupporterService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Criar novo apoiador' })
  @Post()
  async createUser(@Body() user: SupporterDTO) {
    return await this.supporterService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Listar apoiadores' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página (opcional, padrão 1)',
  })
  @ApiQuery({
    name: 'nome',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'email',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'telefone',
    required: false,
    type: Number,
  })
  @Get()
  async listSupportersUsers(
    @Query('page') page: number = 1,
    @Query('nome') nome: string = '',
    @Query('email') email: string = '',
    @Query('telefone') telefone: string = '',
  ) {
    return await this.supporterService.listSupporters(
      page,
      nome,
      email,
      telefone,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualizar um apoiador pelo ID' })
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: SupporterUpdateDTO) {
    return await this.supporterService.updateSupporterById(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Excluir apoiadores pelo ID' })
  @Delete()
  async deleteUser(@Body() body: string[]) {
    return await this.supporterService.deleteSupporterById(body);
  }
}
