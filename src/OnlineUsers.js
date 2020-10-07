import React, { useEffect, useRef } from "react";
//import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
//import { socket } from "./socket";
//import { getUsersByIds } from "./actions";

export default function displayOnlineUsers() {
    //
    const dispatch = useDispatch();
    const onlineUsers = useSelector((state) => state && state.onlineUsers);
    console.log("ONLINE USERS COMPONENT: ", onlineUsers);
    useEffect(() => {
        //dispatch(addToOnlineUsers());
    }, [onlineUsers]);

    /* const onlineUsers = useSelector(
        (state) => state.users && state.users.filter((user) => !user.accepted)
    ); */

    if (!onlineUsers) {
        return null;
    }
    return (
        <div>
            <h3>Others online</h3>
            {onlineUsers &&
                onlineUsers.map(function (user) {
                    return (
                        <div className="friend-ctr" key={user.id}>
                            <div className="friends-img-ctr">
                                <img
                                    src={
                                        user.profilePic || "/images/default.png"
                                    }
                                    alt={`${user.firstname} ${user.lastname}`}
                                />
                            </div>
                            <div className="name">
                                <h4>
                                    {user.firstname} {user.lastname}
                                </h4>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
