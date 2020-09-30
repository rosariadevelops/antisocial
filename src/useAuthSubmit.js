import React, { useState } from "react";
import axios from "./axios";

export function useAuthSubmit(url, value) {
    // if there is an error, we put something in state
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        // make a post req
        axios.post(url, value).then((response) => {
            console.log("register response:", response);
            if (response) {
                location.replace("/");
            } else {
                setError(true);
            }
        });
    };

    return [error, handleSubmit];
}
