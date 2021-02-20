import React, { useEffect, useReducer } from "react";
import Table from "../Table";
import Modal from "../Modal";
import EditModalContent from "../EditModalContent";
import AddModalContent from "../AddModalContent";
import ProductService from "../../services/productService";
import {
  GET_PRODUCTS,
  TOGGLE_ADD_MODAL,
  TOGGLE_EDIT_MODAL,
  SET_SELECTED_PRODUCT,
} from "../../constants/actionTypes";
import findProductById from "../../utils/findProductById";
import useStyles from "../Table/styles";
import { Box, Button, Container, Typography } from "@material-ui/core";
import { Delete, Add } from "@material-ui/icons";

const productService = new ProductService();

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
  products: [],
});

export default function App() {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
    };
    fetchData();
  }, []);

  const handleProductClick = (id) => {
    dispatch({ type: SET_SELECTED_PRODUCT, data: id });
    toggleEditModal();
  };

  const toggleEditModal = () => dispatch({ type: TOGGLE_EDIT_MODAL });

  const handleCreateClick = (id) => {
    toggleAddModal();
  };

  const toggleAddModal = () => dispatch({ type: TOGGLE_ADD_MODAL });

  const createProduct = async (data) => {
    await productService.createProduct(data);
    getProducts();
  };

  const getProducts = async () => {
    const products = await productService.get();
    dispatch({ type: GET_PRODUCTS, data: products });
  };

  const updateProduct = async (data) => {
    await productService.updateProduct(data);
    getProducts();
  };

  const deleteItemById = async (id) => {
    await productService.deleteById(id);
    getProducts();
  };

  const deleteAll = async () => {
    await productService.deleteAll();
    getProducts();
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h3" component="h1" color="textSecondary">
          Products
        </Typography>
        <Button
          className={classes.deleteButton}
          variant="contained"
          color="secondary"
          startIcon={<Delete />}
          onClick={deleteAll}
        >
          Delete All
        </Button>
      </Box>
      <Table
        handleProductClick={handleProductClick}
        products={state.products}
      />
      <Button
        className={classes.deleteButton}
        fullWidth
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleCreateClick}
      >
        Create Product
      </Button>
      {state.isEditModalOpen ? (
        <Modal
          modalContent={
            <EditModalContent
              toggleEditModal={toggleEditModal}
              updateProduct={updateProduct}
              deleteItemById={deleteItemById}
              selectedProduct={state.selectedProduct}
            />
          }
          open={state.isEditModalOpen}
          toggleModal={toggleEditModal}
        />
      ) : null}
      {state.isAddModalOpen ? (
        <Modal
          modalContent={
            <AddModalContent
              toggleAddModal={toggleAddModal}
              createProduct={createProduct}
            />
          }
          toggleModal={toggleAddModal}
          open={state.isAddModalOpen}
        />
      ) : null}
    </Container>
  );
}
