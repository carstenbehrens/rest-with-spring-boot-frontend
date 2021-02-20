import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    height: "100vh",
    width: "100vw",
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    width: "400px",
    maxWidth: "800px",
    pointerEvents: "all",
  },
}));

export default useStyles;
