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

  test("#getProducts succesfully adds products", () => {
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
});
