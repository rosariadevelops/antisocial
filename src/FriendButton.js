import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function friendRequest({ otherUserId }) {
    const [friendshipStatus, setfriendshipStatus] = useState("");
    console.log("outside useEffect: ", otherUserId);

    useEffect(() => {
        let abort;
        (async () => {
            console.log("otherUserId: ", otherUserId);
            const { data } = await axios.get(`/friend-status/${otherUserId}`);
            console.log("result: ", data);
            if (!abort) {
                setfriendshipStatus(data.buttonText);
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
            //setButtonClick();
            console.log("friendshipStatus: ADD FRIEND");
            axios
                .post(`/friend-status/${otherUserId}/add-friend`)
                .then(({ data }) => {
                    console.log("/add-friend response: ", data);
                    setfriendshipStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /friend-status/add-friend: ",
                        err
                    );
                });
        }

        if (friendshipStatus === "Cancel friend request") {
            console.log("friendshipStatus: CANCEL REQUEST");
            axios
                .post(`/friend-status/${otherUserId}/cancel-friend`)
                .then(({ data }) => {
                    console.log("/add-friend response: ", data);
                    setfriendshipStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /friend-status/cancel-request: ",
                        err
                    );
                });
        }

        if (friendshipStatus === "Accept friend request") {
            console.log("friendshipStatus: CANCEL REQUEST");
            axios
                .post(`/friend-status/${otherUserId}/accept-friend`)
                .then(({ data }) => {
                    console.log("/accept-friend response: ", data);
                    setfriendshipStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /friend-status/cancel-request: ",
                        err
                    );
                });
        }

        if (friendshipStatus === "Delete friend") {
            console.log("friendshipStatus: DELETE FRIENDSHIP");
            axios
                .post(`/friend-status/${otherUserId}/delete-friend`)
                .then(({ data }) => {
                    console.log("/add-friend response: ", data);
                    setfriendshipStatus(data.status);
                })
                .catch(function (err) {
                    console.log(
                        "err in form POST /friend-status/delete-friend: ",
                        err
                    );
                });
        }
    }

    return (
        <div className="friend-button">
            <button onClick={sendStatus}>{friendshipStatus}</button>
        </div>
    );
}
