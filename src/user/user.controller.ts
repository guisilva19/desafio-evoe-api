import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDTO, UserUpdateDTO, UserUpdatePassDTO } from './user.dto';

@ApiTags('Perfil')
@Controller('users/me')
export class UserProfileController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obter meu perfil' })
  @Get()
  async getProfile(@Req() req) {
    return await this.userService.findMyUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualizar meu perfil' })
  @Patch()
  async updateProfile(@Body() body: UserUpdateDTO, @Req() req) {
    return await this.userService.updateMyUser(body, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Alterar minha senha' })
  @Patch('credentials')
  async updatePassword(@Body() body: UserUpdatePassDTO, @Req() req) {
    return await this.userService.updateMyPass(body, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Excluir meu perfil' })
  @Delete()
  async deleteProfile(@Req() req) {
    return await this.userService.delete(req.user.id);
  }
}

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Criar novo usuário' })
  @Post()
  async createUser(@Body() user: UserDTO) {
    return await this.userService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Listar usuários apoiadores' })
  @Get()
  async listSupportersUsers(@Req() req) {
    return await this.userService.listSupportersUsers(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
    @Req() req,
  ) {
    return await this.userService.updateUserById(id, req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Excluir um usuário pelo ID' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Req() req) {
    return await this.userService.deleteUserById(id, req.user.id);
  }
}
