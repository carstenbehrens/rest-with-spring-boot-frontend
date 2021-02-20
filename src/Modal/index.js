import React from "react";
import { Box, Modal, Paper } from "@material-ui/core";
import useStyles from "./styles";

export default function AddModal(props) {
  const classes = useStyles();

  const { open, toggleModal, modalContent } = props;

  return (
    <Modal open={open} onClose={toggleModal}>
      <Box
        className={classes.box}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Paper className={classes.paper} display="flex">
          {modalContent}
        </Paper>
      </Box>
    </Modal>
  );
}
