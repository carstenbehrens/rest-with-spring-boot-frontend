import React, { useEffect, useReducer } from "react";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@material-ui/core";
import ProductService from "../Services/productService";
import useStyles from "./styles";
import EditModal from "../EditModal/EditModal";
import findProductById from "../Utils/findProductById";
import { Delete } from "@material-ui/icons";

const productService = new ProductService();

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.data };
    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case "SET_SELECTED_PRODUCT":
      return {
        ...state,
        selectedProductId: action.data,
      };
    default:
      throw new Error();
  }
};

export default function App() {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, {
    selectedProductId: null,
    isModalOpen: false,
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
    };
    fetchData();
  }, []);

  const handleProductClick = (id) => {
    dispatch({ type: "SET_SELECTED_PRODUCT", data: id });
    toggleModal();
  };

  const toggleModal = () => dispatch({ type: "TOGGLE_MODAL" });

  const getProducts = async () => {
    const products = await productService.get();
    dispatch({ type: "GET_PRODUCTS", data: products });
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.products.map((entry) => (
              <TableRow
                className={classes.tableRowStyle}
                key={entry.id}
                onClick={() => handleProductClick(entry.id)}
              >
                <TableCell align="left">{entry.id}</TableCell>
                <TableCell align="left">{entry.title}</TableCell>
                <TableCell align="left">{entry.name}</TableCell>
                <TableCell align="left">{entry.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {state.isModalOpen ? (
        <EditModal
          open={state.isModalOpen}
          toggleModal={toggleModal}
          selectedProduct={findProductById(
            state.products,
            state.selectedProductId
          )}
          deleteItemById={deleteItemById}
          updateProduct={updateProduct}
        />
      ) : null}
    </Container>
  );
}
