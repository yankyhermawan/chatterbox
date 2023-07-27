import { PrismaService } from "../prisma.service";

export class ChannelService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllChannel() {
		try {
			const response = await this.prismaService.channel.findMany();
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

	async createChannel(channelName: string, channelImageURL: string) {
		try {
			const dataToPost = {
				channelName: channelName,
				channelImageURL: channelImageURL,
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

	async getChannelMessage(roomID: string) {
		try {
			const response = await this.prismaService.channel.findMany({
				where: {
					id: roomID,
				},
				orderBy: {
					date: "desc",
				},
				take: 100,
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
