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
const channel_service_1 = require("./channel/channel.service");
const user_service_1 = require("./user/user.service");
const user_guard_1 = require("./auth/user.guard");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const prismaService = new prisma_service_1.PrismaService();
const messageService = new message_service_1.MessageService(prismaService);
const channelService = new channel_service_1.ChannelService(prismaService);
const userGuard = new user_guard_1.UserGuard();
const userService = new user_service_1.UserService(prismaService, userGuard);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const checkTokenMiddleware = (req, res, next) => {
    var _a;
    try {
        const token = String((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1].replace("'", ""));
        const checkToken = userGuard.checkTokenValid(token);
        if (checkToken) {
            next();
        }
        else {
            res.status(400).json("Invalid token");
        }
    }
    catch (err) {
        res.status(500).json("Server Error");
    }
};
const authorizationMiddleware = (req, res, next) => {
    var _a;
    try {
        const token = String((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1].replace("'", ""));
        if (userGuard.authorization(req.params.id, token)) {
            next();
        }
    }
    catch (err) {
        res.status(500).json("Server Error");
    }
};
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});
io.on("connection", (socket) => {
    socket.on("chat message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield messageService.postMessage(msg.channelID, msg.content, msg.senderID);
        if (response) {
            io.emit("chat message", msg);
        }
    }));
});
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, auth_service_1.registerUser)(req.body);
    res.status(response.code).json(response.response);
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, auth_service_1.loginUser)(req.body.email, req.body.password);
    res.status(response.code).json(response.response);
}));
app
    .route("/user/:id")
    .get(checkTokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = String((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1].replace("'", ""));
        const response = yield userService.getUserById(req.params.id, token);
        res.status(response.code).json(response.response);
    }
    catch (err) {
        res.status(500).json("Server error");
    }
}))
    .put(checkTokenMiddleware, authorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = String((_b = req.headers["authorization"]) === null || _b === void 0 ? void 0 : _b.split(" ")[1].replace("'", ""));
        const response = yield userService.putUser(req.params.id, token, req.body);
        res.status(response.code).json(response.response);
    }
    catch (err) {
        res.status(500).json("Server Error");
    }
}));
app.get("/channel/:id", checkTokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield messageService.getChannelMessage(req.params.id);
    res.status(response.code).json(response.response);
}));
app
    .route("/channel")
    .post(checkTokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, imageURL, description, } = req.body;
    const response = yield channelService.createChannel(name, imageURL, description);
    res.status(response.code).json(response.response);
}))
    .get(checkTokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield channelService.getAllChannel();
    res.status(response.code).json(response.response);
}));
app
    .route("/channelmembers/:channelID")
    .get(checkTokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield channelService.getChannelMembers(req.params.channelID);
    res.status(response.code).json(response.response);
}));
app
    .route("/join/:channelID/:userID")
    .post(checkTokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield channelService.joinChannel(req.params.channelID, req.params.userID);
    res.status(response.code).json(response.response);
}));
server.listen(port, () => console.log(`Listening on ${port}`));
//# sourceMappingURL=index.js.map