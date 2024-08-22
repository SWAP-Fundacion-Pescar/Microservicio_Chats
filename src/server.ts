import app from "./app"
import { createServer } from 'node:http';
import { Server } from "socket.io";
import IChatServices from "./Domain/Interfaces/IChatServices";
import ChatServices from "./Domain/Services/ChatServices";
import IncomingMessageDTO from "./Application/DTO/IncomingMessageDTO";
import IChatCommand from "./Infrastructure/Interfaces/IChatCommand";
import ChatCommand from "./Infrastructure/Command/ChatCommand";
import IChatQuery from "./Infrastructure/Interfaces/IChatQuery";
import ChatQuery from "./Infrastructure/Query/ChatQuery";

const PORT = process.env.PORT ?? 3003;
const server = createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: "http://localhost:3000"
        }
    });

const chatCommand: IChatCommand = new ChatCommand();
const chatQuery: IChatQuery = new ChatQuery();
const chatServices: IChatServices = new ChatServices(chatCommand, chatQuery);

io.on('connection',function (socket) {
    socket.on('join', (chatId) => 
        {
            console.log('Un usuario se unio a una sala');
            socket.join(chatId);
        })
    socket.on('msg', async (msg: IncomingMessageDTO, chatId: string) => 
        {                    
            const createdMessage = await chatServices.sendMessage(msg);
            socket.to(chatId).emit('msg', createdMessage);
        })     
})

// Iniciamos el servidor en el puerto 3003
server.listen(PORT, function () {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
})