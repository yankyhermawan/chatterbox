import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { registerUser, loginUser } from "./auth/auth.service";
import { MessageService } from "./message/message.service";
import { PrismaService } from "./prisma.service";
import { ChannelService } from "./channel/channel.service";
import { UserService } from "./user/user.service";
import { UserGuard } from "./auth/user.guard";

interface messageData {
	channelID: string;
	content: string;
	senderID: string;
}

const app = express();

const port = process.env.PORT || 4000;
const prismaService = new PrismaService();
const messageService = new MessageService(prismaService);
const channelService = new ChannelService(prismaService);
const userGuard = new UserGuard();
const userService = new UserService(prismaService, userGuard);

// MIDDLEWARE

app.use(express.json());
app.use(cors());
const checkTokenMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = String(
			req.headers["authorization"]?.split(" ")[1].replace("'", "")
		);
		const checkToken = userGuard.checkTokenValid(token);
		if (checkToken) {
			// Token is valid, proceed to the next middleware or route handler
			next();
		} else {
			// Token is invalid, return an error response
			res.status(401).json("Invalid token");
		}
	} catch (err) {
		res.status(500).json("Server Error");
	}
};

const authorizationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = String(
			req.headers["authorization"]?.split(" ")[1].replace("'", "")
		);
		if (userGuard.authorization(req.params.id, token)) {
			next();
		}
	} catch (err) {
		res.status(500).json("Server Error");
	}
};

const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: true,
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true,
	},
});

io.on("connection", (socket) => {
	socket.on("chat message", async (msg: messageData) => {
		const response = await messageService.postMessage(
			msg.channelID,
			msg.content,
			msg.senderID
		);
		if (response) {
			io.emit("chat message", msg);
		}
	});
});

// AUTH

app.post("/register", async (req, res) => {
	const response = await registerUser(req.body);
	res.status(response.code).json(response.response);
});

app.post("/login", async (req, res) => {
	const response = await loginUser(req.body.email, req.body.password);
	res.status(response.code).json(response.response);
});

app
	.route("/user/:id")
	.get(checkTokenMiddleware, async (req, res) => {
		try {
			const token = String(
				req.headers["authorization"]?.split(" ")[1].replace("'", "")
			);
			const response = await userService.getUserById(req.params.id, token);
			res.status(response.code).json(response.response);
		} catch (err) {
			res.status(500).json("Server error");
		}
	})
	.put(checkTokenMiddleware, authorizationMiddleware, async (req, res) => {
		try {
			const token = String(
				req.headers["authorization"]?.split(" ")[1].replace("'", "")
			);
			const response = await userService.putUser(
				req.params.id,
				token,
				req.body
			);
			res.status(response.code).json(response.response);
		} catch (err) {
			res.status(500).json("Server Error");
		}
	});

app.route("/user/channels/:id").get(checkTokenMiddleware, async (req, res) => {
	try {
		const response = await userService.getUserChannel(req.params.id);
		res.status(response.code).json(response.response);
	} catch (err) {
		res.status(500).json("Server Error");
	}
});

// CHANNEL ENDPOINT

app.get("/channel/:id", checkTokenMiddleware, async (req, res) => {
	const response = await messageService.getChannelMessage(req.params.id);
	res.status(response.code).json(response.response);
});

app
	.route("/channel")
	.post(checkTokenMiddleware, async (req, res) => {
		const {
			name,
			imageURL,
			description,
		}: {
			name: string;
			imageURL: string;
			description: string;
		} = req.body;
		const response = await channelService.createChannel(
			name,
			imageURL,
			description
		);
		res.status(response.code).json(response.response);
	})
	.get(checkTokenMiddleware, async (req, res) => {
		const response = await channelService.getAllChannel();
		res.status(response.code).json(response.response);
	});

app
	.route("/channelmembers/:channelID")
	.get(checkTokenMiddleware, async (req, res) => {
		const response = await channelService.getChannelMembers(
			req.params.channelID
		);
		res.status(response.code).json(response.response);
	});

app
	.route("/join/:channelID/:userID")
	.post(checkTokenMiddleware, async (req, res) => {
		const response = await channelService.joinChannel(
			req.params.channelID,
			req.params.userID
		);
		res.status(response.code).json(response.response);
	});

server.listen(port, () => console.log(`Listening on ${port}`));
