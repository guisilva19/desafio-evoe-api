/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
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
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('me')
  async getProfile(@Req() req) {
    return await this.userService.findMyUser(req.user.id);
  }

  @Post()
  async createUser(@Body() user: UserDTO) {
    return await this.userService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('me')
  async updateProfile(@Body() body: UserUpdateDTO, @Req() req) {
    return await this.userService.updateMyUser(body, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Patch('me/credentials')
  async updatePassword(@Body() body: UserUpdatePassDTO, @Req() req) {
    return await this.userService.updateMyPass(body, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete('me')
  async deleteProfile(@Req() req) {
    return await this.userService.delete(req.user.id);
  }
}
