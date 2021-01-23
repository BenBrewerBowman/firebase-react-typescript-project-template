import { CircularProgress, createStyles, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    fullPage: {
      height: "100vh",
      width: "100vw",
    },
  })
);

type LoadingDivProps = {
  fullPage?: boolean;
};

const LoadingDiv = ({ fullPage }: LoadingDivProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, fullPage && classes.fullPage)}>
      <CircularProgress size={48} />
    </div>
  );
};

export default LoadingDiv;
