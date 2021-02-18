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

const productService = new ProductService();

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.data };
    default:
      throw new Error();
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
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

  return (
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
            <TableRow key={entry.id}>
              <TableCell align="left">{entry.id}</TableCell>
              <TableCell align="right">{entry.title}</TableCell>
              <TableCell align="right">{entry.name}</TableCell>
              <TableCell align="right">{entry.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
