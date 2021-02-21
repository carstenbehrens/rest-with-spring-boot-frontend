import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import AddModalContent from "./index";
import userEvent from "@testing-library/user-event";

let container = null;

describe("#AddModalContent", () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test("Create button is disabled when no data is entered", () => {
    const toggleAddModal = jest.fn();
    const createProduct = jest.fn();

    act(() => {
      render(
        <AddModalContent
          toggleAddModal={toggleAddModal}
          createProduct={createProduct}
        />,
        container
      );
    });

    const createButton = document.querySelector("#addCreateButton");

    expect(createButton.hasAttribute("disabled")).toBe(true);
  });

  test("Create button is no longer disabled when data is entered", () => {
    const toggleAddModal = jest.fn();
    const createProduct = jest.fn();

    act(() => {
      render(
        <AddModalContent
          toggleAddModal={toggleAddModal}
          createProduct={createProduct}
        />,
        container
      );
    });

    const textareas = document.querySelectorAll("textarea");

    // Material ui creates two textareas per input
    // thats why we need to specify the correct ones here.
    const titleTextarea = textareas[0];
    const nameTextarea = textareas[2];
    const descriptionTextarea = textareas[4];

    userEvent.type(titleTextarea, "Konsole");
    userEvent.type(nameTextarea, "PS5");
    userEvent.type(descriptionTextarea, "Something...");

    const createButton = document.querySelector("#addCreateButton");

    expect(createButton.hasAttribute("disabled")).toBe(false);
  });

  test("Calls create product when data is entered and create button is pressed", () => {
    const toggleAddModal = jest.fn();
    const createProduct = jest.fn();

    act(() => {
      render(
        <AddModalContent
          toggleAddModal={toggleAddModal}
          createProduct={createProduct}
        />,
        container
      );
    });

    const textareas = document.querySelectorAll("textarea");

    // Material ui creates two textareas per input
    // thats why we need to specify the correct ones here.
    const titleTextarea = textareas[0];
    const nameTextarea = textareas[2];
    const descriptionTextarea = textareas[4];

    userEvent.type(titleTextarea, "Konsole");
    userEvent.type(nameTextarea, "Playstation 5");
    userEvent.type(descriptionTextarea, "Something...");

    const createButton = document.querySelector("#addCreateButton");

    act(() => {
      createButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(createProduct).toHaveBeenCalledWith({
      title: "Konsole",
      name: "Playstation 5",
      description: "Something...",
    });
  });
});
