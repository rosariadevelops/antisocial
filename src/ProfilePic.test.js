import React from "react";
import ProfilePic from "./Profile";
import { render, fireEvent } from "@testing-library/react";

// Test what the image url is
test("when no url is passed, a default image is renderered", () => {
    const { container } = render(<ProfilePic />);

    console.log("To start, the HTML is: ", container.innerHTML);

    expect(container.querySelector("img").src)
        .endsWith("default.png")
        .toBe(true);

    console.log("After waiting, the HTML is: ", container.innerHTML);
});

// Test what the image url is
test("when no url is passed, a default image is renderered", () => {
    const { container } = render(
        <ProfilePic url="the url you expect it to be" />
    );

    expect(container.querySelector("img").src).toBe(
        "the url you expect it to be"
    );
});

// first and last names
test("First and last name in props get put in alt attribute", () => {
    const { container } = render(
        <ProfilePic firstname="Annie" lastname="Gandar" />
    );

    expect(container.querySelector("img").alt).toBe("Annie Gandar");
});

// to run a test on only one file
test.only("First and last name in props get put in alt attribute", () => {
    const { container } = render(
        <ProfilePic firstname="Annie" lastname="Gandar" />
    );

    expect(container.querySelector("img").alt).toBe("Annie Gandar");
});

// to run a test on the event handler
test.only("onClick prop runs when the img is clicked", () => {
    const onClick = jest.fn(() => console.log("CLICKED!"));
    const { container } = render(<ProfilePic onClick={onClick} />);

    fireEvent.click(container.querySelector("img"));
    expect(onClick.mock.calls.length).toBe(1);
});
