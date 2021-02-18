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
    padding: theme.spacing(1),
    width: "400px",
    maxWidth: "800px",
    pointerEvents: "all",
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  deleteButton: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
