import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserController, UserProfileController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController, UserProfileController],
  providers: [DatabaseService, UserService, JwtService],
})
export class UserModule {}
