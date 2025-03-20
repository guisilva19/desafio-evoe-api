/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDTO, UserUpdateDTO, UserUpdatePassDTO } from './user.dto';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  async findMyUser(@Req() req) {
    const { id } = req.user;
    return await this.userService.findMyUser(id);
  }

  @Post()
  async createUser(@Body() user: UserDTO) {
    return await this.userService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('update')
  async updateMyUser(@Body() body: UserUpdateDTO, @Req() req) {
    const { id } = req.user;
    return await this.userService.updateMyUser(body, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('update-pass')
  async updateMyPass(@Body() body: UserUpdatePassDTO, @Req() req) {
    const { id } = req.user;
    return await this.userService.updateMyPass(body, id);
  }
}
