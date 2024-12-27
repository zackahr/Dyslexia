// src/users/user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema'; // Ensure UserSchema is imported

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the model
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export UserService if needed in other modules
})
export class UserModule {}
