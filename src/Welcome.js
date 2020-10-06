import React from "react";
import { HashRouter, Route } from "react-router-dom";
import RegistrationCustomHooks from "./RegistrationCustomHooks";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    let bgImages = [
        "/images/background/gradient-1.jpg",
        "/images/background/gradient-2.jpg",
        "/images/background/gradient-3.jpg",
        "/images/background/gradient-4.jpg",
    ];
    let selectBG = bgImages[Math.floor(Math.random() * bgImages.length)];
    document.body.style.backgroundImage = `url(${selectBG})`;
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
