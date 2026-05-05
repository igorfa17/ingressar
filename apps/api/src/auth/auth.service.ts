import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(email: string, password: string, fullName: string) {
    const hash = await argon2.hash(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        password_hash: hash,
        full_name: fullName,
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException();

    const valid = await argon2.verify(
      user.password_hash,
      password,
    );

    if (!valid) throw new UnauthorizedException();

    const token = this.jwt.sign({
      sub: user.id,
      email: user.email,
    });

    const payload = {
  sub: user.id,
  email: user.email,
};

    
    return {
      accessToken: token,
    };
  }

  
}