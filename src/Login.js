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
            errorMsg:
                "The entered email or password are incorrect. Please try again",
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
        //const { name, value } = e.target;

        //const { email, password } = this.state;

        /* if (email === null || password === null || this.state.errorMsg) {
            this.setState({
                error: true,
            });
        } else {
            this.setState({
                [name]: value,
                error: false,
            }); */

        axios
            .post("/login", this.state)
            .then(function (response) {
                console.log("login response:", response.data);
                if (response.data.error) {
                    this.setState({
                        error: true,
                    });
                } else {
                    location.replace("/");
                }
            })
            .catch(function (err) {
                console.log("err in  POST /login: ", err);
            });
        //}
        console.log("login state:", this.state);
    }

    render() {
        let state = this.state;
        return (
            <React.Fragment>
                <div className="login-form">
                    <h1>Log in</h1>
                    {state.error && <p className="error">{state.errorMsg}</p>}

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
