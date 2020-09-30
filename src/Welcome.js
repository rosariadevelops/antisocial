import React from "react";
import { HashRouter, Route } from "react-router-dom";
import RegistrationCustomHooks from "./RegistrationCustomHooks";
import LoginCustomHooks from "./LoginCustomHooks";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    return (
        <React.Fragment>
            <div className="welcome logo">
                anti<span>social</span>
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={RegistrationCustomHooks} />
                    <Route path="/login" component={LoginCustomHooks} />
                    <Route path="/password/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </React.Fragment>
    );
}
