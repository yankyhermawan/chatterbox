import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { registerUser, loginUser } from "./auth/auth.service";
import { MessageService } from "./message/message.service";
import { PrismaService } from "./prisma.service";
import { ChannelService } from "./channel/channel.service";

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

// MIDDLEWARE

app.use(express.json());
app.use(cors());

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

app.get("/userdata", async (req, res) => {});

// CHANNEL ENDPOINT

app.get("/channel/:id", async (req, res) => {
	const response = await messageService.getChannelMessage(req.params.id);
	res.status(response.code).json(response.response);
});

app
	.route("/channel")
	.post(async (req, res) => {
		const {
			channelName,
			channelImageURL,
			channelDescription,
			memberID,
		}: {
			channelName: string;
			channelImageURL: string;
			channelDescription: string;
			memberID: string;
		} = req.body;
		const response = await channelService.createChannel(
			channelName,
			channelImageURL,
			channelDescription,
			memberID
		);
		res.status(response.code).json(response.response);
	})
	.get(async (req, res) => {
		const response = await channelService.getAllChannel();
		res.status(response.code).json(response.response);
	});

app.route("/channelmembers/:channelID").get(async (req, res) => {
	const response = await channelService.getChannelMember(req.params.channelID);
	res.status(response.code).json(response.response);
});

app.route("/join/:channelName/:username").post(async (req, res) => {
	const response = await channelService.joinChannel(
		req.params.channelName,
		req.params.username
	);
	res.status(response.code).json(response.response);
});

server.listen(port, () => console.log(`Listening on ${port}`));
