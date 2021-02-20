import React from "react";
import useStyles from "./styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

export default function TableComponent(props) {
  const classes = useStyles();

  const { products, handleProductClick } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((entry) => (
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
  );
}
