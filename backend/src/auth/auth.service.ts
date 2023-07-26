import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

const JWT_KEY = "96b76d8d6d79342b39a6b421b469815f1f6fd6b7383e1ce3048eb5517ae4937c";
const prisma = new PrismaService();

export async function registerUser(firstName: string, lastName: string, email: string, password: string): Promise<string> {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword }
    });

    return 'User registered successfully';
  } catch (error) {
    throw new Error('Could not register user');
  }
}

export async function loginUser(email: string, password: string): Promise<string> {
  try {
    const user: User | null = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new Error('Invalid Email');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid Password');
    }

    const token = jwt.sign({ email: user.email }, JWT_KEY, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new Error('Could not login user');
  }
}