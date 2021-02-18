import React from "react";
import { Modal, Paper, Typography, Box, IconButton } from "@material-ui/core";
import useStyles from "./styles";
import CancelIcon from "@material-ui/icons/Cancel";

export default function EditModal(props) {
  const { open, toggleModal } = props;
  const classes = useStyles();
  return (
    <Modal open={open} onClose={toggleModal}>
      <Box className={classes.box}>
        <Paper className={classes.paper}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Edit</Typography>
            <IconButton size="medium" edge="start" onClick={toggleModal}>
              <CancelIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}
