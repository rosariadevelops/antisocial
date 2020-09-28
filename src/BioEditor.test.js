import React from "react";
import axios from "./axios";
import BioEditor from "./BioEditor";
import { render, fireEvent } from "@testing-library/react";

test("When no bio is passed, an Add button is rendered", () => {
    const { container } = render(<BioEditor bio={null} />);
    const bioEditor = container.innerHTML;
    console.log("This is rendering?", bioEditor);
    expect(container.querySelector("button").innerHTML).toBe("Add one here");
});
