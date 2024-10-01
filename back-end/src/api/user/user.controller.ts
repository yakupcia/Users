import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('search') search?: string,
  ) {
    return this.userService.getAllUsers(page, pageSize, search);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post('save')
  async createUser(@Body() userData: any) {
    return this.userService.createUser(userData);
  }

  @Post('update')
  async updateUser(@Body() userData: any) {
    return this.userService.updateUser(userData);
  }
}
