import * as io from "socket.io-client";
import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        //socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessages", (msgs) => {
            store.dispatch(chatMessages(msgs));
            console.log("LATEST TEN MESSAGES SOCKET: ", msgs);
        });

        //socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));

        /* socket.on("chatMessage", (msg) => {
            console.log(" Got a message in the client. My message is: ", msg);
            store.dispatch(chatMessage(msg));
        }); */
    }
};
