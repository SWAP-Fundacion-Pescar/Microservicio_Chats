import { Server } from "socket.io";
import passport from '../../Infrastructure/Config/Passport'
import IChatCommand from "../../Infrastructure/Interfaces/IChatCommand";
import ChatCommand from "../../Infrastructure/Command/ChatCommand";
import ChatQuery from "../../Infrastructure/Query/ChatQuery";
import IChatQuery from "../../Infrastructure/Interfaces/IChatQuery";
import IChatServices from "../../Domain/Interfaces/IChatServices";
import ChatServices from "../../Domain/Services/ChatServices";
import IncomingMessageDTO from "../DTO/IncomingMessageDTO";


const chatCommand: IChatCommand = new ChatCommand();
const chatQuery: IChatQuery = new ChatQuery();
const chatServices: IChatServices = new ChatServices(chatCommand, chatQuery);

function ChatSocket(io: Server) {
    // Deberia utilizar el tipo correcto
    // io.engine.use((req: any, res: any, next: any) => {
    //     const isHandshake = req._query.sid === undefined;
    //     if (isHandshake) {
    //         passport.authenticate("jwt", { session: false })(req, res, next);
    //     } else {
    //         next();
    //     }
    // });

    io.on('connection', function (socket) {
        console.log('A user connected');
        const user = socket.request.user;
        if (user) {
            console.log('User id: ', user.id);
        }
        socket.on('join', async (chatId) => {
            console.log('A user joined a room');
            socket.join(chatId);
        })
        socket.on('msg', async (msg: IncomingMessageDTO, chatId: string) => {
            const createdMessage = await chatServices.sendMessage(msg);
            const sockets = await io.in(chatId).fetchSockets();
            // Si hay mas de un socket por mismo usuario puede generar duplicados
            if (sockets.length > 1) {
                // Tal vez es necesario eliminar la propiedad IsRead al enviarlo
                socket.to(chatId).emit('msg', createdMessage);
            }
            else {
                // TODO
                // Crear notificacion en el microservicio de notificaciones
            }
        })
    })
}
export default ChatSocket;