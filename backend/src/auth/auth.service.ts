import {
    Injectable,
    UnauthorizedException,
    ForbiddenException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import * as bcrypt from 'bcrypt';
  import { Prisma } from '@prisma/client';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthService {
    private readonly bcryptRound: number;
  
    constructor(
      private readonly prismaService: PrismaService,
      private jwtService: JwtService,
    ) {
      this.bcryptRound = parseInt(process.env['BCRYPT_SALT_ROUND']);
    }
  
    async register(input) {
      const hashedPassword: string = bcrypt.hashSync(
        input.password,
        this.bcryptRound,
      );
      try {
        const newUser = await this.prismaService.user.create({
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            userPassword: {
              create: {
                password: hashedPassword,
              },
            },
          },
        });
        return newUser;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException(
              `The ${error.meta.target} is invalid or already taken`,
            );
          }
        }
        throw error;
      }
    }
  
    async login(email: string, password: string) {
      const user = await this.prismaService.user.findFirst({
        where: {
          email,
        },
        include: {
          userPassword: true,
        },
      });
  
      if (!user) {
        throw new UnauthorizedException('Incorrect username or password');
      }
  
      const isPasswordValid = await bcrypt.compare(
        password,
        user.userPassword.password,
      );
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('Incorrect username or password');
      }
  
      return {
        accessToken: this.jwtService.sign({ userId: user.id }),
      };
    }
  }