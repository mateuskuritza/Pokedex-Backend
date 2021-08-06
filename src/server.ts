import httpServer, { init } from "./app";
const socket = require('socket.io');

const port = +process.env.PORT || 4000;

const server = init().then(() => {
    httpServer.listen(port, () => {
        console.log(`Listening on port ${port}`)
    });
});

const io = socket(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-allowed"],
        credentials: false
    }
});

io.on("connection", async (socket: any) => {
    socket.on("newMessage", () => {
        socket.broadcast.emit("loadMessages");
    });
});