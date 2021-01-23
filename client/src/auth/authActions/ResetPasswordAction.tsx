import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBooleanState } from "react-use-object-state";
import CheckMark from "../../components/checkMark/CheckMark";
import LoadingDiv from "../../components/LoadingDiv";
import { useSnackbarNotification } from "../../snackbarNotification";
import { Theme } from "../../theme";
import ConfirmPasswordTextField from "../ConfirmPasswordTextField";
import PasswordTextField from "../PasswordTextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      display: "flex",
      justifyContent: "center",
    },
    link: {
      textDecoration: "none",
      margin: "0 auto",
    },
    marginTop: {
      marginTop: theme.spacing(3),
    },
    textSpacing: {
      marginBottom: theme.spacing(2),
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: theme.spacing(4),
    },
    input: {
      marginBottom: theme.spacing(2),
      marginTop: 0,
      width: "100%",
      maxWidth: 280,
    },
  })
);

type Props = {
  actionCode: string;
};

const ResetPasswordAction = ({ actionCode }: Props) => {
  const classes = useStyles();
  const notification = useSnackbarNotification();

  const loading = useBooleanState(true);
  const validCode = useBooleanState(false);
  const success = useBooleanState(false);

  useEffect(() => {
    const verifyPasswordResetCode = async () => {
      try {
        // Verify the password reset code is valid.
        await firebase.auth().verifyPasswordResetCode(actionCode);
        validCode.setTrue();
      } catch (error) {
        // Invalid or expired action code. Ask user to try to reset the password again
        notification.error("Error validating code");
      }
      loading.setFalse();
    };
    verifyPasswordResetCode();
    // eslint-disable-next-line
  }, [actionCode]);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const showPassword = useBooleanState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Save the new password.
    if (passwordValid && confirmPasswordValid) {
      try {
        await firebase.auth().confirmPasswordReset(actionCode, password);
        // Password reset has been confirmed and new password updated.
        success.setTrue();
      } catch (error) {
        // Error occurred during confirmation. The code might have expired or the password is too weak.
        notification.error(error.message);
      }
    }
  };

  if (!loading.state && validCode.state && !success.state) {
    return (
      <>
        <Typography variant="h4">New Password</Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <PasswordTextField
            onChangePassword={setPassword}
            onChangeValid={setPasswordValid}
            onChangeShowPassword={showPassword.toggle}
            showPassword={showPassword.state}
            className={classes.input}
          />
          <ConfirmPasswordTextField
            valid={confirmPasswordValid}
            onChangeValid={setConfirmPasswordValid}
            showPassword={showPassword.state}
            primaryPassword={password}
            className={classes.input}
          />
          <Button type="submit" variant="contained" color="primary">
            Create password
          </Button>
        </form>
      </>
    );
  }

  if (loading.state) {
    return <LoadingDiv />;
  }

  if (!validCode.state) {
    return (
      <>
        <Typography variant="h4" align="center">
          Password Reset Error
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          className={classes.marginTop}
        >
          The password reset link has most likely expired. <br /> Try resending
          password reset link to your email and make sure you are clicking the
          most recent reset link.
        </Typography>
      </>
    );
  }

  return (
    <>
      <CheckMark />
      <Typography variant="h4" align="center">
        Password Successfully Changed
      </Typography>

      <Typography
        variant="body1"
        align="center"
        gutterBottom
        className={classes.textSpacing}
      >
        You can now sign in with your new password.
      </Typography>
      <Link to="/auth/login" className={clsx(classes.link)}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign in
        </Button>
      </Link>
    </>
  );
};

export default ResetPasswordAction;
