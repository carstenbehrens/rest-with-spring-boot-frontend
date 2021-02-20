import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  IconButton,
} from "@material-ui/core";
import useStyles from "./styles";
import { Add, Cancel } from "@material-ui/icons";

export default function AddModal(props) {
  const classes = useStyles();

  const { open, toggleAddModal, createProduct } = props;

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isNotEmpty, setIsNotEmpty] = useState(false);

  useEffect(() => {
    if (title !== "" && name !== "" && description !== "") {
      setIsNotEmpty(true);
    } else {
      setIsNotEmpty(false);
    }
  }, [title, name, description, isNotEmpty]);

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
    createProduct({
      title: title,
      name: name,
      description: description,
    });
  };

  return (
    <Modal open={open} onClose={toggleAddModal}>
      <Box
        className={classes.box}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper className={classes.paper} display="flex">
          <Box display="flex" flexDirection="column">
            <Box alignSelf="flex-end">
              <IconButton size="medium" edge="start" onClick={toggleAddModal}>
                <Cancel />
              </IconButton>
            </Box>
          </Box>
          <form noValidate autoComplete="off">
            <Box display="flex" flexDirection="column">
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
                fullWidth
                disabled={!isNotEmpty}
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleEditClick}
              >
                Create
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
}
