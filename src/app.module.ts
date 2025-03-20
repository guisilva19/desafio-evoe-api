import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule],
  controllers: [UsersController],
  providers: [DatabaseService, UsersService],
})
export class AppModule {}
