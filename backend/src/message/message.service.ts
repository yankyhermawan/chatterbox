import { PrismaService } from "../prisma.service";

interface MessageData {
	id: string;
	content: string;
	date: Date;
	senderID: string;
	channelID: string;
	sender: {
		id: string;
		email: string;
		username: string;
		password: string;
		firstName: string;
		lastName: string;
		imageURL: string;
	};
	channel: {
		id: string;
		name: string;
		imageURL: string;
		description: string;
	};
}

export class MessageService {
	constructor(private readonly prismaService: PrismaService) {}
	async postMessage(channelID: string, message: string, senderID: string) {
		try {
			const dataToPost = {
				content: message,
				senderID: senderID,
				channelID: channelID,
			};
			const response = await this.prismaService.message.create({
				data: dataToPost,
			});
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
	async getChannelMessage(channelId: string) {
		try {
			const response = await this.prismaService.message.findMany({
				where: {
					channelID: channelId,
				},
				include: {
					sender: true,
					channel: true,
				},
			});
			response.map((respon: MessageData) => {
				respon.sender.password = "";
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
