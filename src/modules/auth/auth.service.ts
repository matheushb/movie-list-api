import { Injectable } from '@nestjs/common';
import { BcryptService } from '@/common/bcrypt/bcrypt.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(user: User) {
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(username);
    if (
      user &&
      (await this.bcryptService.comparePassword(password, user.password))
    ) {
      delete user.password;
      return user;
    }

    return null;
  }
}
