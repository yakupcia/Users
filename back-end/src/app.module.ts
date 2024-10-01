import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { UserController } from './api/user/user.controller';

import { DatabaseService } from './database/database.service';
import { AppService } from './app.service';
import { UserService } from './api/user/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, DatabaseService, UserService],
})
export class AppModule {}
