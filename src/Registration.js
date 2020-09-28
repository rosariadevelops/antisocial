import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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

        this.setState({
            [name]: value,
        });

        // if error is false, render message
    }

    handleRegistration(e) {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        console.log("this.state.error:", this.state.error);

        const { first, last, email, password } = this.state;

        if (
            first === null ||
            last === null ||
            email === null ||
            password === null
        ) {
            this.setState({
                error: true,
            });
        } else {
            this.setState({
                [name]: value,
                error: false,
            });

            axios
                .post("/welcome", this.state)
                .then(function (response) {
                    console.log("register response:", response);
                    if (response) {
                        location.replace("/");
                    } else {
                        this.setState({
                            error: true,
                        });
                    }
                })
                .catch(function (err) {
                    console.log("err in  POST /register: ", err);
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container rgtr-form">
                    <h1>Create an Account</h1>
                    {this.state.error && (
                        <p className="error">{this.state.error}</p>
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
                        placeholder="Enter password"
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
                <div className="login-link">
                    Already have an account?{" "}
                    <Link to="/login">Log in here</Link>
                </div>
            </React.Fragment>
        );
    }
}
