import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function friendRequest({ otherUserId }) {
    const [friendshipStatus, setfriendshipStatus] = useState("");
    const [buttonClick, setButtonClick] = useState();
    console.log("outside useEffect: ", otherUserId);

    useEffect(() => {
        let abort;
        (async () => {
            console.log("otherUserId: ", otherUserId);
            const { data } = await axios.get(`/friend-status/${otherUserId}`);
            console.log("result: ", data);
            if (!abort) {
                if (data.buttonAdd) {
                    setfriendshipStatus(data.buttonAdd);
                } else if (data.buttonCancel) {
                    setfriendshipStatus(data.buttonCancel);
                } else if (data.buttonAccept) {
                    setfriendshipStatus(data.buttonAccept);
                } else if (data.buttonEnd) {
                    setfriendshipStatus(data.buttonEnd);
                }
            }
        })();
        return () => {
            abort = true;
        };
    });

    function sendStatus() {
        console.log("friendshipStatus: ", friendshipStatus);
        //let abort;
        //(async () => {
        if (friendshipStatus === "Add friend") {
            setButtonClick();
            console.log("friendshipStatus: ADD FRIEND");
            axios
                .post(`/friend-status/${otherUserId}/add-friend`)
                .then(({ data }) => {
                    console.log("/add-friend response: ", data);
                    setfriendshipStatus(data.status);
                })
                .catch(function (err) {
                    console.log("err in form POST /profile/bio: ", err);
                });
        }
    }

    return (
        <div className="friend-button">
            <button onClick={sendStatus}>{friendshipStatus}</button>
        </div>
    );
}

/* else if (friendshipStatus === "Cancel request") {
            axios.post(`/friend-status/${otherUserId}/cancel-request`);
        } else if (friendshipStatus === "Unfriend") {
            axios.post(`/friend-status/${otherUserId}/unfriend`);
        } */
