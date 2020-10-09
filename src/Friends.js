import React, { useEffect } from "react";
//import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { recieveFriendsWannabes, acceptFriendReq, unfriend } from "./actions";
import { Link } from "react-router-dom";

export default function friendsList() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(recieveFriendsWannabes());
    }, []);

    const friends = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );

    const wannabes = useSelector(
        (state) => state.users && state.users.filter((user) => !user.accepted)
    );

    if (!friends && !wannabes) {
        return null;
    }
    console.log("friends:", friends);

    return (
        <div className="friends-ctr">
            <h1>Pending Requests</h1>
            <div className="pending">
                {wannabes &&
                    wannabes.map(function (user) {
                        return (
                            <div className="friends-user" key={user.id}>
                                <div className="friends-img">
                                    <img
                                        src={
                                            user.image_url ||
                                            "/images/default-user.png"
                                        }
                                        alt={`${user.firstname} ${user.lastname}`}
                                    />
                                </div>
                                <div className="name">
                                    <h3>
                                        {user.firstname} {user.lastname}
                                    </h3>
                                    <div className="friend-or-wannabe">
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    acceptFriendReq(user.id)
                                                )
                                            }
                                        >
                                            {/* {friendshipStatus} */}Accept
                                        </button>
                                        <Link to={"/antiuser/" + user.id}>
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <h1>Friends</h1>
            <div className="friends">
                {friends &&
                    friends.map(function (user) {
                        return (
                            <div className="friends-user" key={user.id}>
                                <div className="friends-img">
                                    <img
                                        src={
                                            user.image_url ||
                                            "/images/default-user.png"
                                        }
                                        alt={`${user.firstname} ${user.lastname}`}
                                    />
                                </div>
                                <div className="name">
                                    <h3>
                                        {user.firstname} {user.lastname}
                                    </h3>
                                    <div className="friend-or-wannabe">
                                        <button
                                            onClick={() =>
                                                dispatch(unfriend(user.id))
                                            }
                                        >
                                            {/* {friendshipStatus} */}Delete
                                        </button>
                                        <Link to={"/antiuser/" + user.id}>
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
