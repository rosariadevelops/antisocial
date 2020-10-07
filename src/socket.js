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
            console.log("LATEST TEN MESSAGES SOCKET: ", msgs);
        });

        socket.on("chatMessage", (msg) => {
            //console.log(" Got a message in the client. My message is: ", msg);
            store.dispatch(addNewMessage(msg));
        });

        socket.on("allOnlineUsers", (arrOnliners) => {
            console.log("All online users SOCKET: ", arrOnliners);
            store.dispatch(allOnlineUsers(arrOnliners));
        });

        socket.on("userJoined", (user) => {
            console.log("This user joined SOCKET: ", user);
            store.dispatch(addToOnlineUsers(user));
        });

        socket.on("userLeft", (user) => {
            console.log("This user left SOCKET: ", user);
            store.dispatch(removeFromOnlineUsers(user));
        });
    }
};
