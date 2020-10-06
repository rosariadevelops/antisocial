import axios from "./axios";

export async function recieveFriendsWannabes() {
    const { data } = await axios.get("/friends.json");
    console.log("RECIEVE FRIEND WANNABES: ", data.users);
    return {
        type: "RECIEVE FRIEND WANNABES",
        users: data.users,
    };
}

// returns a promise that is resolved after the query has been performed on the correct row in the db
export async function acceptFriendReq(otherUserId) {
    console.log("ACCEPT FRIEND ID: ", otherUserId);
    const { data } = await axios.post(
        `/friend-status/${otherUserId}/accept-friend`
    );

    console.log("ACCEPT FRIEND WANNABES: ", data);
    return {
        type: "ACCEPT FRIEND",
        status: data.status,
        accepted: data.accepted,
        id: otherUserId,
    };
}

export async function unfriend(otherUserId) {
    const { data } = await axios.post(
        `/friend-status/${otherUserId}/delete-friend`
    );
    console.log("DELETE FRIEND ID: ", otherUserId);
    console.log("DELETE FRIEND WANNABES: ", data);
    return {
        type: "DELETE FRIEND",
        status: data.status,
        deleted: data.deleted,
        id: otherUserId,
    };
}

export async function chatMessages(msgs) {
    console.log("LATEST TEN MESSAGES ACTIONS: ", msgs);
    return {
        type: "LATEST TEN MESSAGES",
        latestMessages: msgs,
    };
}

export async function addNewMessage(msg) {
    console.log("NEW MESSAGE ACTION: ", msg);
    return {
        type: "NEW MESSAGE ADDED",
        newMessage: msg[0],
    };
}
