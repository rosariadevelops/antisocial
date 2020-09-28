// Testing what is inside the main div container

import React from "react";
import App from "./App";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

jest.mock("./axios");

axios.get.mockResolvedValue({
    data: {
        firstname: "Annie",
        lastname: "Gandar",
        id: 4,
    },
});

test("app eventually shows div", async () => {
    const { container } = render(<App />);

    console.log("To start, the HTML is: ", container.innerHTML);

    expect(container.innerHTML).toBe('<img src="/images/loading.gif" />');

    await waitForElement(() => container.querySelector(".nav"));

    console.log("After waiting, the HTML is: ", container.innerHTML);

    expect(container.innerHTML).children.length.toBe(3);
});
