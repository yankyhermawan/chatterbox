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

	async createChannel(
		channelName: string,
		channelImageURL: string,
		channelDescription: string,
		memberID: string
	) {
		try {
			const dataToPost = {
				channelName: channelName,
				channelImageURL: channelImageURL,
				channelDescription: channelDescription,
				membersID: [memberID],
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
		} catch (err) {
			return {
				code: 500,
				response: "Server Error",
			};
		}
	}

	async getChannelMember(channelName: string) {
		const response = await this.prismaService.channel.findFirst({
			where: {
				channelName: channelName,
			},
		});
		return {
			code: 200,
			response: response,
		};
	}

	async joinChannel(channelName: string, username: string) {
		const response = await this.prismaService.channel.update({
			where: {
				channelName: channelName,
			},
			data: {
				membersID: {
					push: username,
				},
			},
		});
		return {
			code: 200,
			response: response,
		};
	}
}
