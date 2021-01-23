import { createStyles, IconButton, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import firebase from "firebase";
import { useState } from "react";
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import { useBooleanState } from "react-use-object-state";
import { Theme } from "../theme";
import EmailTextField from "./EmailTextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginTop: {
      marginTop: theme.spacing(4),
    },
    input: {
      width: "100%",
      maxWidth: 280,
      marginTop: theme.spacing(2),
    },
    error: {
      marginTop: theme.spacing(2),
    },
  })
);

const ResetPassword = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const emailValid = useBooleanState(true);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const emailNoSpaces = email.replace(/ /g, "");
    try {
      // reset password sent to restored email
      await firebase.auth().sendPasswordResetEmail(emailNoSpaces);
      // success sending password
      setSuccess(true);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/user-not-found") {
        setError(
          "This email address does not correspond to an existing account. Either register for a new account or enter an email for an existing user."
        );
      } else {
        setError(error.message);
      }
    }
  };

  if (success) {
    return (
      <>
        <Typography variant="h4">Check Your Mail</Typography>
        <Typography
          variant="subtitle1"
          align="center"
          className={classes.marginTop}
        >
          We sent password reset instructions to your email.
          <br /> If you have trouble finding the reset email, check your junk or
          spam folder.
        </Typography>
      </>
    );
  }

  return (
    <>
      <IconButton
        style={{ position: "absolute", left: 40 }}
        onClick={history.goBack}
      >
        <ArrowLeft />
      </IconButton>
      <Typography variant="h4">Reset Password</Typography>
      <Typography variant="body1" align="center" className={classes.marginTop}>
        Enter the email associated with your account and we&apos;ll send an
        email with instructions to reset your password.
      </Typography>
      <EmailTextField
        email={email}
        onChangeEmail={setEmail}
        onChangeValid={emailValid.setState}
        valid={emailValid.state}
        className={classes.input}
      />
      {error && (
        <Typography color="error" className={classes.error}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        className={classes.input}
        onClick={handleSubmit}
        disabled={!emailValid.state || !email}
      >
        Send reset link
      </Button>
    </>
  );
};

export default ResetPassword;
