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
            <label htmlFor="first">First name:</label>
            <input
                onChange={handleChange}
                type="text"
                name="first"
                autoComplete="false"
                placeholder="Roald"
            />
            <label htmlFor="last">Last name:</label>
            <input
                onChange={handleChange}
                type="text"
                name="last"
                autoComplete="false"
                placeholder="Dahl"
            />
            <label htmlFor="email">Email Address:</label>
            <input
                onChange={handleChange}
                type="email"
                name="email"
                autoComplete="false"
                placeholder="roalddahl@bfg.com"
            />
            <label htmlFor="password">Password:</label>
            <input
                className="pwd-input"
                autoComplete="false"
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                required
            />
            <button
                onClick={handleSubmit}
                type="submit"
                name="submitted"
                value="registered"
            >
                Become antisocial
            </button>
            <div className="login-link">
                Already have an account? <Link to="/login">Log in here</Link>
            </div>
        </div>
    );
}
