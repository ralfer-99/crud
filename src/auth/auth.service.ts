import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(name);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
