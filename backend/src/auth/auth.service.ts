import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaService } from "../prisma.service";

const JWT_KEY =
	process.env["JWT_KEY"] ||
	"0e263e99692d725f0a2335f0dd7cfe080b2d4793d2793d6439e4d6a69daa5e5d";
const prisma = new PrismaService();

interface RegisterProps {
	firstName: string;
	username: string;
	lastName: string;
	email: string;
	password: string;
	imageURL: string;
}

export async function registerUser(data: RegisterProps) {
	try {
		const existingUser = await prisma.user.findUnique({
			where: { email: data.email },
		});
		if (existingUser) {
			return {
				code: 409,
				response: "User already registered",
			};
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);
		const dataToPost = {
			firstName: data.firstName,
			lastName: data.lastName,
			username: data.username,
			email: data.email,
			imageURL: data.imageURL,
			password: hashedPassword,
		};

		const response = await prisma.user.create({
			data: dataToPost,
		});

		response.password = "";

		return {
			code: 201,
			response: response,
		};
	} catch (error) {
		return {
			code: 500,
			response: "Server error",
		};
	}
}

export async function loginUser(email: string, password: string) {
	try {
		const user = await prisma.user.findUnique({ where: { email: email } });
		if (!user) {
			return {
				code: 404,
				response: "User not found",
			};
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return {
				code: 404,
				response: "Invalid password",
			};
		}

		const token = jwt.sign({ email: user.email }, JWT_KEY, { expiresIn: "1h" });
		return {
			code: 200,
			response: {
				userID: user.id,
				access_token: token,
			},
		};
	} catch (error) {
		return {
			code: 500,
			response: "Server error",
		};
	}
}
