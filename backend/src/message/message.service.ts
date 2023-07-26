import { PrismaService } from "../prisma.service";

export class MessageService {
	constructor(private readonly prismaService: PrismaService) {}

	async getChannelMessage(roomID: number) {
		try {
			const response = await this.prismaService.message.findMany({
				where: {
					roomID: roomID,
				},
				orderBy: {
					date: "desc",
				},
				take: 100,
			});
			if (response) {
				return {
					code: 200,
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
	async postMessage(roomID: number, message: string, senderID: number) {
		try {
			const dataToPost = {
				content: message,
				senderID: senderID,
				roomID: roomID,
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
}
