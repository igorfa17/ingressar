import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const auth = req.headers.authorization;

    if (!auth) throw new UnauthorizedException();

    const token = auth.split(' ')[1];

    try {
      const payload = this.jwt.verify(token);
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}