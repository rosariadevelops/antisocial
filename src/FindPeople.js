import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function findAntiUser() {
    const [userInput, setUserInput] = useState("");
    const [antiUsers, setAntiUsers] = useState();

    /*  useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/antiusers" + userInput);
                setAntiUsers(data);
            } catch (err) {
                console.log("err: ", err);
            }
        })();
    }, [userInput]);
 */
    function setAntiUser(e) {
        const { value } = e.target;
        console.log(`has been rendered!`);
        setUserInput(value);
    }

    useEffect(
        (e) => {
            console.log(`userInput: `, e.target.value);
        },
        [userInput]
    );

    return (
        <div>
            <h1>Find people</h1>
            <p>These anti-users just joined:</p>
            <p>Search:</p>
            <input
                // onChange={() => {
                //     handleChange();
                // }}
                onChange={(e) => setAntiUser(e)}
                type="text"
                name="userInput"
                placeholder="Start typing"
            />
            {/* {antiUsers.map((aUser, i) => {
                return <p key={i}>{aUser}</p>;
            })} */}

            {/* <div>
                <h1>Find people</h1>
                <p>These anti-users just joined:</p>
                <p>Search:</p>
                <input
                    onChange={(e) => setAntiUser(e.target.value)}
                    defaultValue={antiUser}
                />
                <div className="search-results-ctr">
                    <div className="">
                        {antiUsers.map((antiUser) => (
                            <div
                                className="search-user"
                                key={antiUser.id}
                            ></div>
                        ))}
                    </div>
                </div>
            </div> */}
        </div>
    );
}
