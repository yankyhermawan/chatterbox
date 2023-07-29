import { PrismaService } from "../prisma.service";

export class ChannelService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllChannel() {
		try {
			const response = await this.prismaService.channel.findMany();
			if (response) {
				return {
					code: 200,
					response: response,
				};
			}
			return {
				code: 403,
				response: "Not Found",
			};
		} catch (err) {
			return {
				code: 500,
				response: "Server error",
			};
		}
	}

	async createChannel(name: string, imageURL: string, description: string) {
		// try {
		const dataToPost = {
			name: name,
			imageURL: imageURL,
			description: description,
		};
		const response = await this.prismaService.channel.create({
			data: dataToPost,
		});
		if (response) {
			return {
				code: 200,
				response: response,
			};
		}
		return {
			code: 422,
			response: "Channel Creation Failed",
		};
		// } catch (err) {
		// 	return {
		// 		code: 500,
		// 		response: "Server Error",
		// 	};
		// }
	}

	async joinChannel(channelID: string, userID: string) {
		const response = await this.prismaService.userChannel.create({
			data: {
				user: { connect: { id: userID } },
				channel: { connect: { id: channelID } },
			},
		});
		return {
			code: 200,
			response: response,
		};
	}

	async getChannelMembers(channelID: string) {
		try {
			const response = await this.prismaService.userChannel.findMany({
				where: {
					channelID: channelID,
				},
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
