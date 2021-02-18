import React, { useEffect, useReducer } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ProductService from "../Services/productService";
import useStyles from "./styles";
import { Container } from "@material-ui/core";
import EditModal from "../EditModal/EditModal";
import findProductById from "../Utils/findProductById";

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

  useEffect(() => {
    const fetchData = async () => {
      const products = await productService.get();
      dispatch({ type: "GET_PRODUCTS", data: products });
    };

    fetchData();
  }, []);

  const toggleModal = (id) => dispatch({ type: "TOGGLE_MODAL", data: id });

  const deleteItemById = async (id) => {
    await productService.deleteById(id);
    const products = await productService.get();
    dispatch({ type: "GET_PRODUCTS", data: products });
  };

  return (
    <Container>
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
      <EditModal
        open={state.isModalOpen}
        toggleModal={toggleModal}
        selectedProduct={findProductById(
          state.products,
          state.selectedProductId
        )}
        deleteItemById={deleteItemById}
      />
    </Container>
  );
}
