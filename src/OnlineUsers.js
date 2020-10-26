import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function displayOnlineUsers() {
    //
    //const dispatch = useDispatch();
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
            <h2>Others online</h2>
            {onlineUsers &&
                onlineUsers.map(function (user) {
                    return (
                        <div
                            className="online-user"
                            key={user.id}
                            onClick={() => this.selectedUser(user)}
                        >
                            <Link to={"/antiuser/" + user.id}>
                                <div className="online-user-img">
                                    <img
                                        src={
                                            user.image_url ||
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
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
}
