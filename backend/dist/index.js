"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const auth_service_1 = require("./auth/auth.service");
const message_service_1 = require("./message/message.service");
const prisma_service_1 = require("./prisma.service");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
const port = process.env.PORT || 4000;
const prismaService = new prisma_service_1.PrismaService();
const messageService = new message_service_1.MessageService(prismaService);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });
});
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, auth_service_1.registerUser)(req.body);
    res.status(response.code).json(response.response);
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, auth_service_1.loginUser)(req.body.email, req.body.password);
    res.status(response.code).json(response.response);
}));
app.get("/messages/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield messageService.getChannelMessage(req.params.id);
    res.status(response.code).json(response.response);
}));
server.listen(port, () => console.log(`Listening on ${port}`));
//# sourceMappingURL=index.js.map