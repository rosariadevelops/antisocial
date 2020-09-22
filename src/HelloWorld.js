import React from "react";
import Name from "./Name";

export default function HelloWorld() {
    const name = "Rosaria";
    const animal = "Penguin";
    return (
        <div>
            <h1 className="title">Hello, {name}!</h1>
            <Name animal={animal} />
        </div>
    );
}
