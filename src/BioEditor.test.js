import React from "react";
import axios from "./axios";
import BioEditor from "./BioEditor";
import { render, fireEvent } from "@testing-library/react";

test("When no bio is passed, an Add button is rendered", () => {
    const { container } = render(<BioEditor bio={null} />);
    expect(container.querySelector("button").innerHTML).toBe("Add one here");
});

test("When a bio is passed, an Edit button is rendered", () => {
    const { container } = render(<BioEditor bio={true} />);
    expect(container.querySelector("button").innerHTML).toBe("Edit");
});

test("Clicking either the Add or Edit button causes a textarea and Save button to appear", () => {
    const onClick = jest.fn(() => console.log("CLICKED"));
    const { container } = render(<BioEditor bioEditorIsVisible={true} />);
    fireEvent.click(container.querySelector(".edit-bio-button"));
    fireEvent.click(container.querySelector(".addBio"));
    expect(container.querySelector(".edit-bio-ctr").innerHTML).toContain(
        "Save"
    );
});
