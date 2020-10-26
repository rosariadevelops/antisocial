import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function findAntiUser() {
    const [userInput, setUserInput] = useState("");
    const [antiUsers, setAntiUsers] = useState();

    useEffect(() => {
        let abort;
        if (!userInput) {
            console.log("should render first 3 users");
            (async () => {
                const { data } = await axios.get(`/antiusers-search`);
                console.log("result: ", data.antiusers[0]);
                if (!abort) {
                    setAntiUsers(data.antiusers[0]);
                }
            })();
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
        <div className="srch">
            <h1>Find others like you</h1>
            <input
                onChange={handleChange}
                defaultValue={userInput}
                type="text"
                name="userInput"
                autoComplete="false"
                placeholder="Start typing"
            />
            {antiUsers != undefined && (
                <div className="search-results">
                    {antiUsers.map((user) => (
                        <div className="search-user" key={user.id}>
                            <Link to={"/antiuser/" + user.id}>
                                <div className="search-img">
                                    <img
                                        src={
                                            user.image_url ||
                                            "/images/default-user.png"
                                        }
                                    />
                                </div>
                                <h3>
                                    {user.firstname} {user.lastname}
                                </h3>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
