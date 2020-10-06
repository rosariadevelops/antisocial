import React from "react";

export default function ({
    imageURL = "/images/default-user.png",
    firstname,
    lastname,
    clickHandler,
}) {
    return (
        <img
            className="profpic"
            src={imageURL}
            alt={firstname + " " + lastname}
            onClick={clickHandler}
        />
    );
}
