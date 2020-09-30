import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function findAntiUser() {
    const [userInput, setUserInput] = useState("");
    const [antiUsers, setAntiUsers] = useState();

    useEffect(() => {
        let abort;
        if (!userInput) {
            console.log("should render first 3 users");
            axios.get("/antiusers-search").then(({ data }) => {
                console.log("result: ", data.antiusers[0]);
                setAntiUsers(data.antiusers[0]);
            });
            /* (async () => {
                const { data } = await axios.get(`/antiusers/`);
                console.log("SEARCH DATA: ", data);
                /* if (!abort) {
                    setAntiUsers(data.searchResults);
                } 
            })(); */
        } else {
            (async () => {
                console.log("checking for users");
                const { data } = await axios.get(`/antiusers/${userInput}`);
                console.log("SEARCH DATA: ", data.searchResults);
                if (!abort) {
                    setAntiUsers(data.searchResults);
                }
            })();
        }
        return () => {
            abort = true;
        };
    }, [userInput]);

    function handleChange(e) {
        console.log("handle change: ", e.target.value);
        setUserInput(e.target.value);
    }

    console.log("ANTIUSERS:", antiUsers);

    return (
        <div>
            <h1>Find people</h1>
            <p>These anti-users just joined:</p>

            <p>Search:</p>
            <input
                onChange={handleChange}
                defaultValue={userInput}
                type="text"
                name="userInput"
                placeholder="Start typing"
            />
            {antiUsers != undefined && (
                <div className="search-results">
                    {antiUsers.map((user) => (
                        <div key={user.id}>
                            <h3>{user.firstname}</h3>
                        </div>
                    ))}
                </div>
            )}
            {/* <div className="search-results">
                {antiUsers.map((user) => (
                    <div key={user.id}>
                        <h3>{user.firstname}</h3>
                    </div>
                ))}
            </div> */}
        </div>
    );
}
