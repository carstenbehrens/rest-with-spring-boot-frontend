import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core";
import useStyles from "./styles";
import { Cancel, Delete, Edit } from "@material-ui/icons";

export default function EditModalContent(props) {
  const classes = useStyles();

  const {
    toggleEditModal,
    selectedProduct,
    deleteProductById,
    updateProduct,
  } = props;

  const [title, setTitle] = useState(selectedProduct.title);
  const [name, setName] = useState(selectedProduct.name);
  const [description, setDescription] = useState(selectedProduct.description);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (
      title !== selectedProduct.title ||
      name !== selectedProduct.name ||
      description !== selectedProduct.description
    ) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [title, name, description, selectedProduct, isEdited]);

  const handleDeleteClick = async () => {
    await deleteProductById(selectedProduct.id);
    toggleEditModal();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEditClick = () => {
    updateProduct({
      id: selectedProduct.id,
      title: title,
      name: name,
      description: description,
    });
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>Edit ID: {selectedProduct.id}</Typography>
        <IconButton size="medium" edge="start" onClick={toggleEditModal}>
          <Cancel />
        </IconButton>
      </Box>
      <form noValidate autoComplete="off">
        <Box>
          <TextField
            className={classes.textField}
            label="Title"
            multiline
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            label="Name"
            multiline
            value={name}
            onChange={handleNameChange}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            label="Description"
            multiline
            value={description}
            onChange={handleDescriptionChange}
            variant="outlined"
          />
        </Box>
        <Box display="flex" flexDirection="row" mt={1}>
          <Button
            id="editDeleteButton"
            className={classes.deleteButton}
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<Delete />}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
          <Button
            id="editUpdateButton"
            fullWidth
            disabled={!isEdited}
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </Box>
      </form>
    </>
  );
}
