import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            first: null,
            last: null,
            email: null,
            password: null,
            error: false,
        };
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState(
            {
                [name]: value,
            },
            () => console.log("this.state: ", this.state)
        );

        // if error is false, render message
    }

    // where do I put this code in order to redirect user after they have logged in?
    // form submit
    // hash the password
    // insert into users table
    // then
    // location.replace('/')

    handleRegistration(e) {
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        const name = target.name;
        /* const first = document.querySelector("#first");
        const last = document.querySelector("#last");
        const email = document.querySelector("#email");
        const password = document.querySelector("#password"); */
        console.log("this.state.error:", this.state.error);

        const { first, last, email, password } = this.state;

        if (
            first === null ||
            last === null ||
            email === null ||
            password === null
        ) {
            this.setState(
                {
                    error: true,
                },
                () => console.log("this.state: ", this.state)
            );
        } else {
            this.setState(
                {
                    [name]: value,
                    error: false,
                },
                () => console.log("this.state: ", this.state)
            );

            axios
                .post("/welcome", this.state)
                .then(function (response) {
                    console.log("register response:", response);
                    location.replace("/");
                })
                .catch(function (err) {
                    console.log("err in  POST /register: ", err);
                });
        }
    }

    render() {
        return (
            <div className="rgtr-form">
                <h3>Register here:</h3>
                {this.state.error && (
                    <p className="error">
                        Please make sure all input fields have been filled.
                    </p>
                )}
                <label htmlFor="first">Enter your first name:</label>
                <input
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                    name="first"
                    placeholder="First name"
                />
                <label htmlFor="last">Enter your last name:</label>
                <input
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                    name="last"
                    placeholder="Last name"
                />
                <label htmlFor="email">Enter your Email:</label>
                <input
                    onChange={(e) => this.handleChange(e)}
                    type="email"
                    name="email"
                    placeholder="Email address"
                />
                <label htmlFor="password">Create a password:</label>
                <input
                    onChange={(e) => this.handleChange(e)}
                    type="password"
                    name="password"
                    required
                />
                <button
                    onClick={(e) => this.handleRegistration(e)}
                    type="submit"
                    name="submitted"
                    value="registered"
                >
                    Register
                </button>
            </div>
        );
    }
}
