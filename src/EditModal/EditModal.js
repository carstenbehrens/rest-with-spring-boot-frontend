import React from "react";
import {
  Modal,
  Paper,
  Typography,
  Box,
  IconButton,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import { Cancel, Delete, Edit } from "@material-ui/icons";

export default function EditModal(props) {
  const classes = useStyles();
  const { open, toggleModal, selectedProduct } = props;

  // Preventing Component from Rendering when modal is closed or no product is selected
  if (!open || selectedProduct === undefined) {
    return null;
  }

  return (
    <Modal open={open} onClose={toggleModal}>
      <Box className={classes.box}>
        <Paper className={classes.paper} display="flex">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Edit ID: {selectedProduct.id}</Typography>
            <IconButton size="medium" edge="start" onClick={toggleModal}>
              <Cancel />
            </IconButton>
          </Box>
          <Box></Box>
          <Box display="flex" flexDirection="row">
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<Delete />}
            >
              Delete
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<Edit />}
            >
              Edit
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}
