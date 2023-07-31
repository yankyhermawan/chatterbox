import { UserGuard } from "../auth/user.guard";
import { PrismaService } from "../prisma.service";
import * as bcrypt from "bcrypt";

interface UserData {
	email: string;
	password: string;
	username: string;
	firstName: string;
	lastName: string;
	imageURL: string;
}

export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userGuard: UserGuard
	) {}
	// private readonly userGuard = new UserGuard();

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
				user.password = "";
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

	async putUser(userId: string, token: string, data: UserData) {
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
			if (data.password) {
				data.password = bcrypt.hashSync(data.password, 10);
			}
			if (user) {
				const dataToUpdate = {
					email: data.email || user.email,
					password: data.password || user.password,
					username: data.username || user.username,
					firstName: data.firstName || user.firstName,
					lastName: data.lastName || user.lastName,
					imageURL: data.imageURL || user.imageURL,
				};
				const updatedUser = await this.prismaService.user.update({
					where: {
						id: userId,
					},
					data: dataToUpdate,
				});
				updatedUser.password = "";
				return {
					code: 200,
					response: updatedUser,
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
