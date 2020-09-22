import React from "react";
import Registration from "./Registration";

export default function Welcome() {
    return (
        <React.Fragment>
            <div className="welcome logo">
                Anti<span>Social</span>
            </div>
            <Registration />
        </React.Fragment>
    );
}
