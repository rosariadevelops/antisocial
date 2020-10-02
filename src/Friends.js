import React, { useEffect } from "react";
//import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import {
    recieveFriendsWannabes /* , acceptFriendReq, unfriend */,
} from "./actions";

export default function friendsList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(recieveFriendsWannabes());
        /* dispatch(acceptFriendReq());
        dispatch(unfriend()); */
    }, []);

    /* const users = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    ); */
    //console.log("users: ", users);

    const friends = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );

    const wannabes = useSelector(
        (state) => state.users && state.users.filter((user) => !user.accepted)
    );

    if (!friends && !wannabes) {
        return null;
    }

    return (
        <div>
            <h1>Pending Requests</h1>
            {wannabes &&
                wannabes.map(function (user) {
                    return (
                        <div className="friend-ctr" key={user.id}>
                            <div className="profile-img-ctr">
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
            <h1>Friends</h1>
            {friends &&
                friends.map(function (user) {
                    return (
                        <div className="friend-ctr" key={user.id}>
                            <div className="profile-img-ctr">
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
