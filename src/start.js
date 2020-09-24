import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";

let component;
if (location.pathname === "/welcome") {
    component = <Welcome />;
} else {
    component = (
        <div className="logo">
            Anti<span>Social</span>
        </div>
    );
}

ReactDOM.render(component, document.querySelector("main"));
