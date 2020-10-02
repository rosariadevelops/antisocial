import axios from "axios";

export async function recieveFriendsWannabes() {
    const { data } = await axios.get("/friends.json");
    console.log("RECIEVE FRIEND WANNABES: ", data.users);
    return {
        type: "RECIEVE FRIEND WANNABES",
        users: data.users,
    };
}

export async function acceptFriendReq() {
    const { data } = await axios.get(
        "/friend-status/:otherUserId/accept-friend"
    );
    console.log("ACCEPT FRIEND WANNABES: ", data);
    /* return {
        type: "RECIEVE FRIEND WANNABES",
        friendsWannabes: data.users,
    }; */
}

export async function unfriend() {
    const { data } = await axios.get(
        "/friend-status/:otherUserId/delete-friend"
    );
    console.log("DELETE FRIEND WANNABES: ", data);
    /* return {
        type: "RECEIVE_USERS",
        users: data.users,
    }; */
}
