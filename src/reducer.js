export default function (state = {}, action) {
    if (action.type == "RECIEVE FRIEND WANNABES") {
        state = Object.assign({}, state, {
            users: action.users,
        });
    } else if (action.type === "ACCEPT FRIEND") {
        state = {
            ...state,
            users: state.users.map((user) => {
                console.log("action.id", action.id);
                console.log("user.id: ", user.id);
                if (action.id === user.id) {
                    console.log("made it to the IF", user);
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
        console.log("ACCEPT FRIEND REDUCER: ", state.user);
    } else if (action.type === "DELETE FRIEND") {
        state = {
            ...state,
            users: state.users.filter((user) => action.id != user.id),
        };
        console.log("DELETE FRIEND REDUCER: ", state.user);
    } else if (action.type === "LATEST TEN MESSAGES") {
        console.log("LATEST TEN MESSAGES REDUCER: ", action);
        state = {
            ...state,
            latestMessages: action.latestMessages,
        };
    } else if (action.type === "NEW MESSAGE ADDED") {
        console.log("LATEST TEN MESSAGES REDUCER: ", action);
        state = {
            ...state,
            latestMessages: [...state.latestMessages, action.newMessage],
        };
    } else if (action.type === "ALL ONLINE USERS") {
        //console.log("ALL ONLINE USERS REDCUER: ", action);
        //
        state = {
            ...state,
            onlineUsers: action.onlineUsers,
        };
    } else if (action.type === "A USER IS ONLINE") {
        console.log("A USER JOINED ONLINE REDCUER: ", action);
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.newUser],
        };
    } else if (action.type === "A USER HAS LEFT ONLINE") {
        console.log("A USER LEFT ONLINE REDCUER: ", action);
        state = {
            ...state,
            onlineUsers: state.onlineUsers.splice(action.userLeft),
        };
    }
    return state;
}
