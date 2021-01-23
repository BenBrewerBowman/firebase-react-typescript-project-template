import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";
import { useBooleanState } from "react-use-object-state";
import { useSnackbarNotification } from "../snackbarNotification";
import { Theme } from "../theme";
import { useSession } from "./useSession";

const useStyles = makeStyles((theme: Theme) => ({
  loading: {
    marginRight: theme.spacing(2),
    height: theme.spacing(3),
    width: theme.spacing(3),
    color: "white",
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  emailSentMessage: {
    marginBottom: theme.spacing(4),
  },
  email: {
    color: theme.palette.text.primary,
  },
}));

const EmailVerification = () => {
  const classes = useStyles({});
  const notification = useSnackbarNotification();
  const { user } = useSession();

  const loading = useBooleanState(true);

  const submitEmailVerification = async () => {
    loading.setTrue();
    try {
      await user?.sendEmailVerification();
    } catch (error) {
      notification.error(error.message);
    } finally {
      loading.setFalse();
    }
  };

  useEffect(() => {
    submitEmailVerification();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Typography variant="h4" className={classes.title}>
        Email verification
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        color="textSecondary"
        align="center"
        className={classes.emailSentMessage}
      >
        We sent an email verification to{" "}
        <b className={classes.email}>{user?.email}</b>.
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        color="textSecondary"
        align="center"
        className={classes.emailSentMessage}
      >
        <b>Not seeing an email?</b>
        <br /> Try waiting at least a minute. Try refreshing your inbox and
        checking your spam folder. Make sure your email displayed above is
        correct.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={submitEmailVerification}
      >
        {loading.state ? (
          <>
            <CircularProgress
              size={20}
              color="inherit"
              className={classes.loading}
            />
            Resending...
          </>
        ) : (
          "Resend verification"
        )}
      </Button>
    </>
  );
};

export default EmailVerification;
