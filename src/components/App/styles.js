import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 350,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.light,
  },
  tableRowStyle: {
    "&:hover": {
      backgroundColor: "#D3D3D3",
      cursor: "pointer",
    },
  },
}));

export default useStyles;
