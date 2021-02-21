import {
  GET_PRODUCTS,
  TOGGLE_ADD_MODAL,
  TOGGLE_EDIT_MODAL,
  SET_SELECTED_PRODUCT,
} from "../../constants/actionTypes";
import findProductById from "../../utils/findProductById";

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.data };
    case TOGGLE_EDIT_MODAL:
      return {
        ...state,
        isEditModalOpen: !state.isEditModalOpen,
      };
    case TOGGLE_ADD_MODAL:
      return {
        ...state,
        isAddModalOpen: !state.isAddModalOpen,
      };
    case SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: findProductById(state.products, action.data),
      };
    default:
      throw new Error();
  }
};

export const getInitialState = () => ({
  selectedProduct: null,
  isEditModalOpen: false,
  isAddModalOpen: false,
  products: undefined,
});
