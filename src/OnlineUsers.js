import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link } from "react-router-dom";

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

    /* if (!onlineUsers) {
        return null;
    } */
    return (
        <div>
            <h3>Others online</h3>
            {onlineUsers &&
                onlineUsers.map(function (user) {
                    return (
                        <div
                            className="online-user"
                            key={user.id}
                            onClick={() => this.selectedUser(user)}
                        >
                            <a href={"/antiuser/" + user.id}>
                                <div className="online-user-img">
                                    <img
                                        src={
                                            user.profilePic ||
                                            "/images/default-user.png"
                                        }
                                        alt={`${user.firstname} ${user.lastname}`}
                                    />
                                </div>
                                <div className="name">
                                    <h4>
                                        {user.firstname} {user.lastname}
                                    </h4>
                                </div>
                            </a>
                        </div>
                    );
                })}
        </div>
    );
}
