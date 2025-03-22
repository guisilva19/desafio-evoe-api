import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const comparePasswordHashed = bcrypt.compareSync(pass, user.senha);

    if (user && comparePasswordHashed) {
      const { senha, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      throw new UnauthorizedException();
    }
  }

  async auth({ email, senha }: { email: string; senha: string }) {
    const user = await this.validateUser(email, senha);
    return {
      access_token: this.jwtService.sign(
        { id: user.id },
        {
          secret: process.env.KEY_SECRET_JWT as string,
          expiresIn: '24h',
        },
      ),
    };
  }
}
