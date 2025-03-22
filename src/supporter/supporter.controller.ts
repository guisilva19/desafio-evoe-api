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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @Get()
  async listSupportersUsers(@Query('page') page: number = 1) {
    return await this.supporterService.listSupporters(page);
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
