import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import OnlineUsers from "./OnlineUsers";
// useSelecter grabs things that are in the global state

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.latestMessages);
    /* const messagesFromLoggedUser = useSelector(
        (state) => state && state.messagesFromLoggedUser
    ); */
    //console.log("messagesFromLoggedUser COMPONENT: ", messagesFromLoggedUser);
    const elemRef = useRef();

    useEffect(() => {
        if (elemRef.current) {
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        }
    }, [chatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("Latest chat message", e.target.value);
            e.target.value = "";
        }
    };

    if (!chatMessages) {
        return null;
    }

    return (
        <div className="chat-container">
            <h1>Antisocialites socialising</h1>

            <div className="chat-constrain">
                <div className="chat-ctr" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map(function (msg) {
                            return (
                                <div className="msg-ctr" key={msg.id}>
                                    <div className="msg-img-ctr">
                                        <img
                                            src={
                                                msg.image_url ||
                                                "/images/default-user.png"
                                            }
                                            alt={`${msg.firstname} ${msg.lastname}`}
                                        />
                                    </div>
                                    <div className="msg-content">
                                        <p>
                                            {msg.firstname} {msg.lastname}
                                        </p>
                                        <h4>{msg.chat_msg}</h4>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <textarea
                    placeholder="Add your message here"
                    cols="80"
                    rows="2"
                    onKeyDown={keyCheck}
                ></textarea>

                <div className="online-users-ctr">
                    <OnlineUsers />
                </div>
            </div>
        </div>
    );
}
