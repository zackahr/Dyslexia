// src/users/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema'; // Ensure User schema is imported
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,  // Inject the model for User
  ) {}

  // Create a new user with a hashed password
  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    return user.save();
  }

  // Find user by username
  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }

  // Find user by ID
  async findUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
