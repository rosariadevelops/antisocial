import React from "react";
//import axios from "./axios";
import { Link } from "react-router-dom";
import { useStatefulFields } from "./useStatefulFields";
import { useAuthSubmit } from "./useAuthSubmit";

export default function Registration() {
    const [value, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/welcome", value);
    return (
        <div className="container rgtr-form">
            <h1>Create an Account</h1>
            {error && <p className="error">{error}</p>}
            <label htmlFor="first">Enter your first name:</label>
            <input
                onChange={handleChange}
                type="text"
                name="first"
                placeholder="First name"
            />
            <label htmlFor="last">Enter your last name:</label>
            <input
                onChange={handleChange}
                type="text"
                name="last"
                placeholder="Last name"
            />
            <label htmlFor="email">Enter your Email:</label>
            <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email address"
            />
            <label htmlFor="password">Create a password:</label>
            <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter password"
                required
            />
            <button
                onClick={handleSubmit}
                type="submit"
                name="submitted"
                value="registered"
            >
                Register
            </button>
            <div className="login-link">
                Already have an account? <Link to="/login">Log in here</Link>
            </div>
        </div>
    );
}
