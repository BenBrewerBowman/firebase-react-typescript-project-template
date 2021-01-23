import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import firebase from "firebase";
import clsx from "clsx";
import { Theme } from "../../theme";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 600,
    margin: theme.spacing(0, 3),
  },
  progress: {
    margin: "0 auto",
  },
  button: {
    maxWidth: 300,
    display: "block",
    margin: "0 auto",
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  actionCode: string;
};

const RecoverEmailAction = ({ actionCode }: Props) => {
  const classes = useStyles();

  const [codeHasBeenVerified, setCodeHasBeenVerified] = useState<boolean>(
    false
  );
  const [
    errorValidatingActionCode,
    setErrorValidatingActionCode,
  ] = useState<string>("");
  const [restoredEmail, setRestoredEmail] = useState<string>("");
  const [
    errorSendingPasswordResetEmail,
    setErrorSendingPasswordResetEmail,
  ] = useState<string>("");
  const [resetPasswordSent, setResetPasswordSent] = useState<boolean>(false);

  useEffect(() => {
    const validateActionCode = async () => {
      // confirm the action code is valid.
      try {
        const info = await firebase.auth().checkActionCode(actionCode);
        const restoredEmail = info.data.email;
        await firebase.auth().applyActionCode(actionCode);
        setRestoredEmail(restoredEmail || "");
      } catch (error) {
        // invalid code.
        setErrorValidatingActionCode(error.message);
      }
      setCodeHasBeenVerified(true);
    };

    validateActionCode();
  }, [actionCode]);

  // loading
  if (!codeHasBeenVerified) {
    return <CircularProgress className={classes.progress} color="primary" />;
  }

  // Error updating email address
  if (errorValidatingActionCode) {
    return (
      <div className={classes.root}>
        <Typography variant="h4" align="center">
          Email Update Error
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className={classes.marginTop}
        >
          There was a problem recovering your email. Either the recovery code is
          invalid, or there is a problem on our end. Try recovering your email
          again or contacting support.
        </Typography>
      </div>
    );
  }

  // error sending pw reset email
  if (errorSendingPasswordResetEmail) {
    return (
      <div className={classes.root}>
        <Typography variant="h4" align="center">
          Error Sending Reset
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className={classes.marginTop}
        >
          {errorSendingPasswordResetEmail}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className={classes.marginTop}
        >
          There was a problem sending you password reset email. Try the link
          again, or restarting the recovery process.
        </Typography>
      </div>
    );
  }

  // password reset sent
  if (resetPasswordSent) {
    return (
      <div className={classes.root}>
        <Typography variant="h4" align="center">
          Password Reset
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          align="center"
          className={classes.marginTop}
        >
          We sent a password reset to: <b>{restoredEmail}</b>
        </Typography>
        <Typography
          variant="body1"
          align="center"
          className={classes.marginTop}
        >
          Follow the instructions in the email to reset your password.
          <br /> You can now close this tab.
        </Typography>
      </div>
    );
  }

  const sendPasswordResetEmail = async (event: any) => {
    event.preventDefault();
    // reset password sent to restored email
    try {
      await firebase.auth().sendPasswordResetEmail(restoredEmail);
      setResetPasswordSent(true);
    } catch (error) {
      setErrorSendingPasswordResetEmail(error.message);
    }
  };

  // email address successfully recovered
  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">
        Email address recovered
      </Typography>
      <Typography variant="body1" align="center" className={classes.marginTop}>
        Your sign-in email address has been changed back to
      </Typography>
      <Typography variant="body1" align="center" color="textPrimary">
        <b>{restoredEmail}</b>
      </Typography>
      <Typography variant="body1" align="center" className={classes.marginTop}>
        If you did not change your sign-in email, you should change your
        password right away. Someone may be attempting to access your account,
        or may have stolen your password.
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={clsx(classes.button, classes.marginTop)}
        onClick={sendPasswordResetEmail}
      >
        Change my password
      </Button>
    </div>
  );
};

export default RecoverEmailAction;
