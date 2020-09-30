import React from "react";
//import axios from "./axios";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";

export default function Login() {
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/welcome", value);
    return (
        <div className="login-form">
            <h1>Log in</h1>
            {error && <p className="error">{error}</p>}
            <label htmlFor="email">Enter your Email:</label>
            <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email address"
            />
            <label htmlFor="password">Enter your password:</label>
            <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Password"
                required
            />
            <button
                onClick={handleSubmit}
                type="submit"
                name="loggingin"
                value="loggedin"
            >
                Log in
            </button>
            <div className="rgtr-link">
                Don&apos;t have an account{" "}
                <Link to="/registration">Register here</Link>
            </div>
        </div>
    );
}
