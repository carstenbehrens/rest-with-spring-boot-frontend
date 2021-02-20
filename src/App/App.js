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
        selectedProductId: action.data,
      };
    default:
      throw new Error();
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    selectedProductId: null,
    isModalOpen: false,
    products: [],
  });
  const classes = useStyles();

  const getProducts = async () => {
    const products = await productService.get();
    dispatch({ type: "GET_PRODUCTS", data: products });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProducts();
    };
    fetchData();
  }, []);

  const toggleModal = (id) => dispatch({ type: "TOGGLE_MODAL", data: id });

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
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.products.map((entry) => (
              <TableRow
                className={classes.tableRowStyle}
                key={entry.id}
                onClick={() => toggleModal(entry.id)}
              >
                <TableCell align="left">{entry.id}</TableCell>
                <TableCell align="right">{entry.title}</TableCell>
                <TableCell align="right">{entry.name}</TableCell>
                <TableCell align="right">{entry.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {state.selectedProductId !== null ? (
        <EditModal
          open={state.isModalOpen}
          toggleModal={toggleModal}
          selectedProduct={findProductById(
            state.products,
            state.selectedProductId
          )}
          deleteItemById={deleteItemById}
        />
      ) : null}
    </Container>
  );
}
