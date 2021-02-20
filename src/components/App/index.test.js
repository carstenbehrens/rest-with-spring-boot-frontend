import { reducer, getInitialState } from "./index";
import {
  GET_PRODUCTS,
  TOGGLE_ADD_MODAL,
  TOGGLE_EDIT_MODAL,
  SET_SELECTED_PRODUCT,
} from "../../constants/actionTypes";

describe("#reducer", () => {
  let state;

  beforeEach(() => {
    state = getInitialState();
  });

  test("Succesfully adds products", () => {
    const products = [
      {
        id: 1,
        title: "Konsole",
        name: "PS 5",
        description: "Console from Sony",
      },
    ];
    const action = {
      type: GET_PRODUCTS,
      data: products,
    };
    const result = reducer(state, action);

    expect(result.products).toBe(products);
  });

  test("Succesfully toggles edit modal", () => {
    const action = {
      type: TOGGLE_EDIT_MODAL,
    };
    const result = reducer(state, action);

    expect(result.isEditModalOpen).toBe(true);
  });

  test("Succesfully toggles add modal", () => {
    const action = {
      type: TOGGLE_ADD_MODAL,
    };
    const result = reducer(state, action);

    expect(result.isAddModalOpen).toBe(true);
  });

  test("Add Selected Product", () => {
    state.products = [
      {
        id: 5,
        title: "Konsole",
        name: "Playstation 5",
        description:
          "Die PlayStation ist eine Spielkonsole des japanischen Konzerns Sony",
      },
      {
        id: 3,
        title: "Konsole",
        name: "Nintendo Switch",
        description:
          "Die Nintendo Switch ist eine Spielkonsole des japanischen Herstellers Nintendo.",
      },
    ];

    const action = {
      type: SET_SELECTED_PRODUCT,
      data: 3,
    };
    const result = reducer(state, action);

    expect(result.selectedProduct).toBe(state.products[1]);
  });
});
