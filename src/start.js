import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import Portal from "./Portal";

let component;
if (location.pathname === "/welcome") {
    component = <Welcome />;
} else {
    component = <Portal />;
}

ReactDOM.render(component, document.querySelector("main"));
