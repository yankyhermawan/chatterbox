import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server);

// MIDDLEWARE
app.use(express.json());
app.use(cors());


io.on("connection", (socket) => {
	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});
});

server.listen(4000, () => console.log("listening on *:4000"));
