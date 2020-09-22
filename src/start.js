import React from "react";
import ReactDOM from "react-dom";
// import HelloWorld from "./HelloWorld";
import Welcome from "./Welcome";

let component;
if (location.pathname === "/welcome") {
    component = <Welcome />;
} else {
    component = <p>AntiSocial</p>;
}

ReactDOM.render(component, document.querySelector("main"));
