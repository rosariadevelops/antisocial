import * as io from "socket.io-client";
import {
    chatMessages,
    addNewMessage,
    allOnlineUsers,
    addToOnlineUsers,
    removeFromOnlineUsers,
} from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => {
            store.dispatch(chatMessages(msgs));
            //console.log("LATEST TEN MESSAGES SOCKET: ", msgs);
        });

        socket.on("chatMessage", (msg) => {
            //console.log(" Got a message in the client. My message is: ", msg);
            store.dispatch(addNewMessage(msg));
        });

        // This should emitted by server and is sent only to user who just connected
        socket.on("allOnlineUsers", (arrOnliners) => {
            //console.log("All online users SOCKET: ", arrOnliners);
            store.dispatch(allOnlineUsers(arrOnliners));
        });

        // This should be emitted by the server and sent to all BUT the user who just joined
        socket.on("userJoined", (user) => {
            //console.log("This user joined SOCKET: ", user);
            store.dispatch(addToOnlineUsers(user));
        });

        socket.on("userLeft", (userId) => {
            console.log("This user left SOCKET: ", userId);
            store.dispatch(removeFromOnlineUsers(userId));
        });
    }
};
