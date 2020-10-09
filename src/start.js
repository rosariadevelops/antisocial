import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./App";
import { init } from "./socket";

// REDUX
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import { Provider } from "react-redux";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let component;
const userIsLoggedIn = location.pathname != "/welcome";

if (userIsLoggedIn) {
    init(store);
    component = (
        <Provider store={store}>
            <App />
        </Provider>
    );
} else {
    component = <Welcome />;
}

ReactDOM.render(component, document.querySelector("main"));
