import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
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
    }

    handleLogin(e) {
        e.preventDefault();
        const { name, value } = e.target;
        console.log("this.state.error:", this.state.error);

        const { email, password } = this.state;

        if (email === null || password === null) {
            this.setState({
                error: true,
            });
        } else {
            this.setState({
                [name]: value,
                error: false,
            });

            axios
                .post("/login", this.state)
                .then(function (response) {
                    console.log("login response:", response);
                    if (response) {
                        location.replace("/");
                    } else {
                        this.setState({
                            error: true,
                        });
                    }
                })
                .catch(function (err) {
                    console.log("err in  POST /login: ", err);
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="login-form">
                    <h1>Log in</h1>
                    {this.state.error && (
                        <p className="error">{this.state.error}</p>
                    )}
                    <label htmlFor="email">Email Address:</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="email"
                        name="email"
                        autoComplete="false"
                        placeholder="rosaparks@blm.com"
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="password"
                        name="password"
                        autoComplete="false"
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        required
                    />
                    <button
                        onClick={(e) => this.handleLogin(e)}
                        type="submit"
                        name="loggingin"
                        value="loggedin"
                    >
                        Log in
                    </button>
                </div>
                <div className="rgtr-link">
                    Don&apos;t have an account{" "}
                    <Link to="/registration">Register here</Link>
                </div>
            </React.Fragment>
        );
    }
}
