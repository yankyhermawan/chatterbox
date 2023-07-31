import { UserGuard } from "../auth/user.guard";
import { PrismaService } from "../prisma.service";

export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly userGuard = new UserGuard();

  async getUserById(userId: string, token: string) {
    const checkToken = this.userGuard.checkTokenValid(token);

    if (!checkToken) {
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

  async putUser(userId: string, token: string, data: any) {
    const checkToken = this.userGuard.checkTokenValid(token);

    if (!checkToken) {
      return {
        code: 403,
        response: "Unauthorized. Please Log In.",
      };
    }

    try {
      const user = await this.prismaService.user.update({
        where: { id: userId },
        data,
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

  async deleteUser(userId: string, token: string) {
    const checkToken = this.userGuard.checkTokenValid(token);

    if (!checkToken) {
      return {
        code: 403,
        response: "Unauthorized. Please Log In.",
      };
    }

    try {
      const user = await this.prismaService.user.delete({
        where: { id: userId },
      });

      if (user) {
        return {
          code: 200,
          response: "User deleted successfully",
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
