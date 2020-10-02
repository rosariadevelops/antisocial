export default function (state = {}, action) {
    if (action.type == "RECIEVE FRIEND WANNABES") {
        state = Object.assign({}, state, {
            users: action.users,
        });
    }
    console.log("reducer data: ", state.users);
    return state;
}
