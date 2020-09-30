import React, { useState } from "react";
// this will only work for registration and login

export function useStatefulFields() {
    const [value, setValue] = useState({});
    // generic naming for reusability
    // initialising value with an empty object
    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
            // setValue will delete the state of other input fields, so use ...value spread operator so we can add all the older states
            // the spread operator copies an older object
        });
        // store input in state
        // we know it's an object because we passed it
        // this does the same thing as the setState object in classes
        console.log("useStatefulFields value: ", value);
    };

    return [value, handleChange];
    // returning it in order to be able to use it across every input field
    // when this custom hook is called, it's going to return an array
}
// really important that it starts with the word use, because React knows that it's a hook function
