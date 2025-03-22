import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

@ApiTags('Usuarios')
@Controller('users/me')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Criar usuário' })
  @Post()
  async register(@Body() body: UserDTO) {
    return await this.userService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Obter meu perfil' })
  @Get()
  async getProfile(@Req() req) {
    return await this.userService.findMyUser(req.user.id);
  }
}
