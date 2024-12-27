// src/users/user.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // Route to create a new user
  @Post()
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.userService.createUser(username, password);
  }

  // Route to get user by ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  // Route to get all users (for testing/admin purposes)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
