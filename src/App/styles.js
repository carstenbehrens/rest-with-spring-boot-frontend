import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 350,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default useStyles;
