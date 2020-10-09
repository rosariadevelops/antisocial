import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDisplay: 1,
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

    handleEmailSend(e) {
        e.preventDefault();
        const { name, value } = e.target;
        //console.log("this.state:", this.state);

        const { email } = this.state;

        if (email === null) {
            this.setState({
                error: true,
            });
        } else {
            this.setState({
                [name]: value,
                error: false,
            });

            axios
                .post("/password/reset/start", this.state)
                .then((response) => {
                    console.log("/password/reset/start", response);
                    if (response.data.errorMsg) {
                        this.setState({
                            error: true,
                        });
                    } else {
                        this.setState({
                            currentDisplay: 2,
                        });
                    }
                })
                .catch(function (err) {
                    console.log("err in  POST /password/reset/start: ", err);
                });
        }
    }

    handlePwReset(evt) {
        evt.preventDefault();
        const { name, value } = evt.target;
        console.log("this.state:", this.state);

        const { cryptocode, email, password } = this.state;

        if (cryptocode === null || password === null) {
            this.setState({
                error: true,
            });
        } else {
            this.setState({
                [name]: value,
                email: email, // check this doesn't throw an error
                error: false,
            });

            axios
                .post("/password/reset/verify", this.state)
                .then((response) => {
                    console.log("/password/reset/verify", response);
                    if (response.data.errorMsg) {
                        this.setState({
                            error: true,
                        });
                    } else {
                        this.setState({
                            currentDisplay: 3,
                        });
                    }
                })
                .catch(function (err) {
                    console.log("err in  POST /password/reset/verify: ", err);
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* <div className="welcome logo">
                    Anti<span>Social</span>
                </div> */}
                <div className="reset-container">
                    {this.state.currentDisplay == 1 && (
                        <div className="pw-reset-form">
                            <h1>Reset your password</h1>
                            <p>
                                Please enter the email address with which you
                                entered. We will send you an email with a
                                time-sensitive confirmation code.
                            </p>
                            {this.state.error && (
                                <p className="error">{this.state.error}</p>
                            )}
                            <label htmlFor="email">Enter your Email:</label>
                            <input
                                onChange={(e) => this.handleChange(e)}
                                type="email"
                                name="email"
                                placeholder="Email address"
                                required
                            />
                            <button
                                onClick={(e) => this.handleEmailSend(e)}
                                type="submit"
                                name="sendemail"
                                value="sendemail"
                            >
                                Send reset code
                            </button>
                        </div>
                    )}
                    {this.state.currentDisplay == 2 && (
                        <div className="pw-reset-form">
                            {this.state.error && (
                                <p className="error">{this.state.error}</p>
                            )}
                            <p>Please enter the code you received on email:</p>
                            <input
                                onChange={(e) => this.handleChange(e)}
                                type="text"
                                min="6"
                                name="cryptocode"
                                placeholder="Enter 6-digit code"
                                required
                            />
                            <p>Now create a new password:</p>
                            <input
                                onChange={(e) => this.handleChange(e)}
                                type="password"
                                name="password"
                                className="pwd-input"
                                placeholder="Enter password"
                                required
                            />
                            <button
                                onClick={(evt) => this.handlePwReset(evt)}
                                type="submit"
                                name="resetpw"
                                value="resetpw"
                            >
                                Save
                            </button>
                        </div>
                    )}
                    {this.state.currentDisplay == 3 && (
                        <div className="pw-reset-form">
                            <h3>Success!</h3>
                            <div className="login-link">
                                You can now log in with your new password:{" "}
                                <Link to="/login">Log in here</Link>
                            </div>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}
