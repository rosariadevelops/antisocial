export default function (state = {}, action) {
    if (action.type == "RECIEVE FRIEND WANNABES") {
        state = Object.assign({}, state, {
            users: action.users,
        });
    } else if (action.type === "ACCEPT FRIEND") {
        state = {
            ...state,
            users: state.users.map((user) => {
                // console.log("action.id", action.id);
                // console.log('user.id: ',user.id);
                if (action.id == user.id) {
                    console.log("ACCEPT FRIEND REDUCER: ", user);
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    } else if (action.type === "DELETE FRIEND") {
        state = {
            ...state,
            users: state.users.map((user) => {
                console.log("action.id", action.id);
                console.log("user.id: ", user.id);
                if (action.id == user.id) {
                    console.log("DELETE FRIEND REDUCER: ", user);
                    return {
                        ...user,
                        deleted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }
    console.log("reducer data: ", state.users);
    return state;
}
