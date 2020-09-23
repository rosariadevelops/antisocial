import React from "react";
import ReactDOM from "react-dom";
import ResetPassword from "./ResetPassword";
// import HelloWorld from "./HelloWorld";
import Welcome from "./Welcome";

let component;
if (location.pathname === "/welcome") {
    component = <Welcome />;
} else if (location.pathname === "/password/reset") {
    component = <ResetPassword />;
} else {
    component = (
        <div className="logo">
            Anti<span>Social</span>
        </div>
    );
}

ReactDOM.render(component, document.querySelector("main"));
