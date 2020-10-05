import React from "react";
import { HashRouter, Route } from "react-router-dom";
import RegistrationCustomHooks from "./RegistrationCustomHooks";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    return (
        <React.Fragment>
            <div className="nav">
                <div className="welcome logo">
                    anti<span>social</span>
                </div>
            </div>
            <HashRouter>
                <div className="ctr">
                    <Route exact path="/" component={RegistrationCustomHooks} />
                    <Route path="/login" component={Login} />
                    <Route path="/password/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </React.Fragment>
    );
}
