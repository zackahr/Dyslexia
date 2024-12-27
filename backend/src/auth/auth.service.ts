import { Injectable } from '@nestjs/common';
// import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';  // Import bcrypt

@Injectable()
export class AuthService {
  constructor(
    // private userService: UserService,  // Inject UserService
    private jwtService: JwtService,    // Inject JwtService
  ) {}

  // async validateUser(username: string, password: string): Promise<any> {
  //   const user = await this.userService.findUserByUsername(username);
  //   if (user && await bcrypt.compare(password, user.password)) {
  //     return { username: user.username, userId: user._id };
  //   }
  //   return null;
  // }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),  // Generate the JWT token
    };
  }
}
