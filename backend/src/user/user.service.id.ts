import { PrismaService } from "../prisma.service";

export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(userId: string) {
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

  async deleteUserById(userId: string) {
    try {
      const existingUser = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return {
          code: 404,
          response: "User not found",
        };
      }

      const response = await this.prismaService.user.delete({
        where: { id: userId },
      });

      return {
        code: 200,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Server error",
      };
    }
  }
}
