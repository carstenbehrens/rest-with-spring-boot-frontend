import React from "react";
import {
  Box,
  Button,
  Modal,
  Paper,
  Typography,
  TextField,
  IconButton,
} from "@material-ui/core";
import useStyles from "./styles";
import { Cancel, Delete, Edit } from "@material-ui/icons";

export default function EditModal(props) {
  const classes = useStyles();
  const { open, toggleModal, selectedProduct, deleteItemById } = props;

  // Preventing Component from Rendering when modal is closed or no product is selected
  if (!open || selectedProduct === undefined) {
    return null;
  }

  const deleteItemAndCloseModal = async () => {
    await deleteItemById(selectedProduct.id);
    toggleModal();
  };

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
          <Box>
            <form noValidate autoComplete="off">
              <TextField
                className={classes.textField}
                label="Title"
                multiline
                value={selectedProduct.title}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Name"
                multiline
                value={selectedProduct.name}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Description"
                multiline
                value={selectedProduct.description}
                variant="outlined"
              />
            </form>
          </Box>
          <Box display="flex" flexDirection="row" mt={1}>
            <Button
              className={classes.deleteButton}
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<Delete />}
              onClick={deleteItemAndCloseModal}
            >
              Delete
            </Button>
            <Button
              fullWidth
              disabled
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
