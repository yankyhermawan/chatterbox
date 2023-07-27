import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { registerUser, loginUser } from "./auth/auth.service";
import { MessageService } from "./message/message.service";
import { PrismaService } from "./prisma.service";

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 4000;
const prismaService = new PrismaService();
const messageService = new MessageService(prismaService);

// MIDDLEWARE

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});
});

app.post("/register", async (req, res) => {
	const response = await registerUser(req.body);
	res.status(response.code).json(response.response);
});

app.post("/login", async (req, res) => {
	const response = await loginUser(req.body.email, req.body.password);
	res.status(response.code).json(response.response);
});

app.get("/messages/:id", async (req, res) => {
	const response = await messageService.getChannelMessage(req.params.id);
	res.status(response.code).json(response.response);
});

server.listen(port, () => console.log(`Listening on ${port}`));
