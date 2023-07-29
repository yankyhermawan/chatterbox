import { PrismaService } from "../prisma.service";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
}

export class UserMeService {
  constructor(private readonly prismaService: PrismaService) {}

  private verifyToken(token: string): DecodedToken | null {
    try {
      const secretKey = process.env.JWT_KEY || "default-secret-key";
      const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
      return decodedToken;
    } catch (err) {
      return null;
    }
  }

  async getUserById(userId: string, token: string) {
    const decodedToken = this.verifyToken(token);

    if (!decodedToken || decodedToken.userId !== userId) {
      return {
        code: 403,
        response: "Unauthorized. Please Log In.",
      };
    }

    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (user) {
        return {
          code: 200,
          response: user,
        };
      } else {
        return {
          code: 404,
          response: "User not found",
        };
      }
    } catch (err) {
      return {
        code: 500,
        response: "Server error",
      };
    }
  }
}
