import React from "react";

export default function ({ imageURL, first, last, clickHandler }) {
    return (
        <img src={imageURL} alt={`${first} ${last}`} onClick={clickHandler} />
    );
}
