import {
  createStyles,
  IconButton,
  makeStyles,
  Slide,
  Snackbar,
  SnackbarContent,
  Theme,
  Typography,
} from "@material-ui/core";
import { amber, green, red } from "@material-ui/core/colors";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import clsx from "clsx";
import { X } from "react-feather";
import { useSnackbarNotification } from "./SnackbarNotificationContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 600,
    },
    INFO: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
    WARNING: {
      color: theme.palette.common.white,
      backgroundColor: amber[700],
    },
    SUCCESS: {
      color: theme.palette.common.white,
      backgroundColor: green[400],
    },
    ERROR: {
      color: theme.palette.common.white,
      backgroundColor: red[400],
    },
    message: {
      width: "100%",
      display: "flex",
    },
    messageText: {
      marginRight: theme.spacing(1),
    },
    icon: {
      width: 28,
      height: 28,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(2),
    },
    closeButton: {
      padding: theme.spacing(0.25),
      width: theme.spacing(2.75),
      height: theme.spacing(2.75),
      marginLeft: "auto",
      marginTop: theme.spacing(0),
    },
    snackbarContent: {
      padding: theme.spacing(0.75, 1, 0.75, 2),
    },
  })
);

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

export const SnackbarNotification = () => {
  const classes = useStyles({});
  const {
    isOpen,
    message,
    variant,
    closeNotification,
  } = useSnackbarNotification();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      TransitionComponent={SlideTransition}
      open={isOpen}
      autoHideDuration={5000}
      onClose={closeNotification}
      className={classes.root}
    >
      <SnackbarContent
        classes={{
          root: clsx(classes.snackbarContent, classes[variant]),
          message: classes.message,
        }}
        message={
          <>
            <Typography variant="body1" className={classes.messageText}>
              {message}
            </Typography>
            <IconButton
              key="close"
              color="inherit"
              onClick={closeNotification}
              className={classes.closeButton}
            >
              <X />
            </IconButton>
          </>
        }
      />
    </Snackbar>
  );
};
