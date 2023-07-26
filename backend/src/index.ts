import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 4000;

// MIDDLEWARE

app.use(express.json());
app.use(cors());

// MIDDLEWARE
app.use(express.json());
app.use(cors());


// MIDDLEWARE
app.use(express.json());
app.use(cors());


io.on("connection", (socket) => {
	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});
});

server.listen(port, () => console.log(`Listening on ${port}`));
