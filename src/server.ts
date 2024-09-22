import app from "./app.js"
import { createServer, IncomingMessage } from 'node:http';
import { Server } from "socket.io";
import ChatSocket from "./Application/Sockets/ChatSocket.js";

interface User
{
    id: string;
}
declare module 'node:http'
{
    interface IncomingMessage
    {
        user?: User;
    }
}
const PORT = process.env.PORT ?? 3003;
const server = createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: "http://localhost:3005"
        },
        maxHttpBufferSize: 4e6 // 4Mb
    });
ChatSocket(io);
// Iniciamos el servidor en el puerto 3003
server.listen(PORT, function () {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
})