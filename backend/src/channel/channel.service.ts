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
		} catch (err) {
			return {
				code: 500,
				response: "Server error",
			};
		}
	}
}
