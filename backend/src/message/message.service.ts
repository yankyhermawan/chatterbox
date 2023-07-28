import { PrismaService } from "../prisma.service";

export class MessageService {
	constructor(private readonly prismaService: PrismaService) {}
	async postMessage(channelID: string, message: string, senderID: string) {
		try {
			const dataToPost = {
				content: message,
				senderID: senderID,
				channelID: channelID,
			};
			console.log(dataToPost);
			const response = await this.prismaService.message.create({
				data: dataToPost,
			});
			console.log(response);
			if (response) {
				return {
					code: 201,
					response: response,
				};
			}
		} catch (err) {
			return {
				code: 500,
				response: "Server error",
			};
		}
	}
	async getChannelMessage(channelID: string) {
		try {
			const response = await this.prismaService.message.findMany({
				where: {
					channelID: channelID,
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
