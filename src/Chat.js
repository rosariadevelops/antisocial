import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
//import { chatMessages } from "./actions";
import { socket } from "./socket";
// useSelecter grabs things that are in the global state

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.latestMessages);
    const elemRef = useRef();

    useEffect(() => {
        // scrollTop = scrollHeight - clientHeight
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            //console.log("message: ", e.target.value);
            e.preventDefault();
            socket.emit("Latest chat message", e.target.value);
            e.target.value === "";
        }
    };

    if (!chatMessages) {
        return null;
    }
    console.log("CHAT COMPONENT: ", chatMessages);

    return (
        <div>
            <p>Welcome to Chat</p>
            <div className="chat-ctr" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(function (msg) {
                        return (
                            <div className="msg-ctr" key={msg.id}>
                                <div className="msg-img-ctr">
                                    <img
                                        src={
                                            msg.profilePic ||
                                            "/images/default-user.png"
                                        }
                                        alt={`${msg.firstname} ${msg.lastname}`}
                                    />
                                </div>
                                <div className="msg-content">
                                    <h4>{msg.chat_msg}</h4>
                                    <p>
                                        {msg.firstname} {msg.lastname}
                                    </p>
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
        </div>
    );
}
