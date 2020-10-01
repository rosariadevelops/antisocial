import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function friendRequest(props) {
    const [friendshipStatus, setfriendshipStatus] = useState("");
    let otherUserId = props.otherUserId;
    console.log("outside useEffect: ", otherUserId);

    useEffect(() => {
        //let abort;
        //if (!userInput) {
        (async () => {
            console.log("otherUserId: ", otherUserId);
            const { data } = await axios.get(`/friend-status/${otherUserId}`);
            console.log("result: ", data);
            // if (!abort) {
            if (data.buttonAdd) {
                setfriendshipStatus(data.buttonAdd);
            } else if (data.buttonCancel) {
                setfriendshipStatus(data.buttonCancel);
            } else if (data.buttonAccept) {
                setfriendshipStatus(data.buttonAccept);
            }
            //}
        })();
        /* } else {
            (async () => {
                console.log("checking for users");
                const { data } = await axios.get(`/antiusers/${userInput}`);
                console.log("SEARCH DATA: ", data.searchResults);
                if (!abort) {
                    setAntiUsers(data.searchResults);
                }
            })();
        } */
        /* return () => {
            abort = true;
        }; */
    }, []);

    /* function handleChange(e) {
        console.log("handle change: ", e.target.value);
        setUserInput(e.target.value);
    } */

    return (
        <div className="friend-button">
            <button>{friendshipStatus}</button>
        </div>
    );
}
