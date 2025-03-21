import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
      return false;
    }

    const authToken = token.split(' ')[1];
    try {
      const decoded = await this.jwtService.verify(authToken, {
        secret: process.env.KEY_SECRET_JWT,
      });
      request.user = decoded;
      return decoded === null ? false : true;
    } catch (err) {
      return false;
    }
  }
}
