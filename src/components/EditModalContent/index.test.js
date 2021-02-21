import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import EditModalContent from "./index";
import fakeApiResponse from "../../utils/fakeApiResponse";
import userEvent from "@testing-library/user-event";

let container = null;

describe("#EditModalContent", () => {
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

  test("Calls deleteProductById when delete button is clicked", () => {
    const toggleEditModal = jest.fn();
    const selectedProduct = fakeApiResponse[0];
    const deleteProductById = jest.fn();
    const updateProduct = jest.fn();

    act(() => {
      render(
        <EditModalContent
          toggleEditModal={toggleEditModal}
          selectedProduct={selectedProduct}
          deleteProductById={deleteProductById}
          updateProduct={updateProduct}
        />,
        container
      );
    });

    // The delete button
    const deleteButton = document.querySelector("#editDeleteButton");

    act(() => {
      deleteButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(deleteProductById).toHaveBeenLastCalledWith(1);
  });

  test("Update button is disabled", () => {
    const toggleEditModal = jest.fn();
    const selectedProduct = fakeApiResponse[0];
    const deleteProductById = jest.fn();
    const updateProduct = jest.fn();

    act(() => {
      render(
        <EditModalContent
          toggleEditModal={toggleEditModal}
          selectedProduct={selectedProduct}
          deleteProductById={deleteProductById}
          updateProduct={updateProduct}
        />,
        container
      );
    });

    const updateButton = document.querySelector("#editUpdateButton");

    expect(updateButton.hasAttribute("disabled")).toBe(true);
  });

  test("Set update button to be no longer disabled when the title, name or description changes", () => {
    const toggleEditModal = jest.fn();
    const selectedProduct = fakeApiResponse[0];
    const deleteProductById = jest.fn();
    const updateProduct = jest.fn();

    act(() => {
      render(
        <EditModalContent
          toggleEditModal={toggleEditModal}
          selectedProduct={selectedProduct}
          deleteProductById={deleteProductById}
          updateProduct={updateProduct}
        />,
        container
      );
    });

    // The title textarea
    const textarea = document.querySelector("textarea");

    userEvent.type(textarea, "Test");

    const updateButton = document.querySelector("#editUpdateButton");

    // Disabled attribute should no longer exists
    expect(updateButton.hasAttribute("disabled")).toBe(false);
  });

  test("Calls updateProduct when update button is pressed", () => {
    const toggleEditModal = jest.fn();
    const selectedProduct = fakeApiResponse[0];
    const deleteProductById = jest.fn();
    const updateProduct = jest.fn();

    act(() => {
      render(
        <EditModalContent
          toggleEditModal={toggleEditModal}
          selectedProduct={selectedProduct}
          deleteProductById={deleteProductById}
          updateProduct={updateProduct}
        />,
        container
      );
    });

    // The title textarea
    const textarea = document.querySelector("textarea");

    userEvent.type(textarea, "Test");

    const updateButton = document.querySelector("#editUpdateButton");

    act(() => {
      updateButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // Disabled attribute should no longer exists
    expect(updateProduct).toHaveBeenCalledWith({
      ...selectedProduct,
      title: "KonsoleTest",
    });
  });
});
