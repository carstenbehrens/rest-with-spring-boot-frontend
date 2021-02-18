import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    pointerEvents: "none",
  },
  paper: {
    padding: "10px",
    width: "400px",
    maxWidth: "800px",
    pointerEvents: "all",
  },
}));

export default useStyles;
