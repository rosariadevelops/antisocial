import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    return (
        <React.Fragment>
            <div className="welcome logo">
                Anti<span>Social</span>
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/password/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </React.Fragment>
    );
}
