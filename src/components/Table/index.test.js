import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Table from "./index";
import fakeApiResponse from "../../utils/fakeApiResponse";

let container = null;

describe("#Table", () => {
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

  test("Calls handleProductClick when table row gets clicked", () => {
    const handleProductClick = jest.fn();
    act(() => {
      render(
        <Table
          products={fakeApiResponse}
          handleProductClick={handleProductClick}
        />,
        container
      );
    });

    // The first product in the table
    const tableRow = document.querySelectorAll("tr")[1];

    act(() => {
      tableRow.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(handleProductClick).toHaveBeenCalledTimes(1);
  });
});
