import React from "react";

export default function ({ imageURL, firstname, lastname, clickHandler }) {
    return (
        <img
            src={imageURL}
            alt={`${firstname} ${lastname}`}
            onClick={clickHandler}
        />
    );
}
