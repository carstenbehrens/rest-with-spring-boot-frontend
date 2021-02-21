import React from "react";
import { Box, Container, Typography } from "@material-ui/core";

export default function ErrorMessage() {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" component="h1" color="textSecondary">
          Could not fetch products.
        </Typography>
        <Typography color="textSecondary">
          Please verify that the backend API is running.
        </Typography>
        <Typography color="textSecondary">
          Check out the README.md for more information.
        </Typography>
      </Box>
    </Container>
  );
}
