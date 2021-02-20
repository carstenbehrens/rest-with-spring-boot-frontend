import React from "react";
import useStyles from "./styles";
import { Box, Modal, Paper } from "@material-ui/core";

export default function ModalCompoent(props) {
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
