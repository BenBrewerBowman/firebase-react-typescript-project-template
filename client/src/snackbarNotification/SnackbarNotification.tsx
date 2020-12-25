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
import { amber, green } from "@material-ui/core/colors";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import clsx from "clsx";
import React from "react";
import { AlertCircle, CheckCircle, Info, X } from "react-feather";
import { SnackbarNotificationVariant } from "./SnackbarNotification.types";
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
      backgroundColor: green[600],
    },
    ERROR: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.dark,
    },
    message: {
      display: "flex",
      alignItems: "center",
    },
    icon: {
      fontSize: 28,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(2),
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
        className={classes[variant]}
        message={
          <span id="alert-snackbar" className={classes.message}>
            {
              {
                [SnackbarNotificationVariant.INFO]: (
                  <Info className={clsx(classes.icon, classes.iconVariant)} />
                ),
                [SnackbarNotificationVariant.SUCCESS]: (
                  <CheckCircle
                    className={clsx(classes.icon, classes.iconVariant)}
                  />
                ),
                [SnackbarNotificationVariant.WARNING]: (
                  <AlertCircle
                    className={clsx(classes.icon, classes.iconVariant)}
                  />
                ),
                [SnackbarNotificationVariant.ERROR]: (
                  <AlertCircle
                    className={clsx(classes.icon, classes.iconVariant)}
                  />
                ),
              }[variant]
            }
            <Typography variant="subtitle1">{message}</Typography>
          </span>
        }
        action={[
          <IconButton key="close" color="inherit" onClick={closeNotification}>
            <X />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};
