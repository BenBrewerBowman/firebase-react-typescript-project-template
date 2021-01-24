import { Button, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckMark from "../../components/checkMark/CheckMark";
import LoadingDiv from "../../components/LoadingDiv";
import { SIGNIN_ROUTE } from "../../constants";
import { Theme } from "../../theme";

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    display: "flex",
    justifyContent: "center",
  },
  errorText: {
    marginBottom: theme.spacing(),
  },
  link: {
    textDecoration: "none",
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  actionCode: string;
};

const VerifyEmailAction = ({ actionCode }: Props) => {
  const classes = useStyles({});

  const [validCode, setValidCode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const applyActionCode = async () => {
      try {
        await firebase.auth().applyActionCode(actionCode);
        // Email address has been verified.
        setValidCode(true);
      } catch (err) {
        // Code is invalid or expired. Ask the user to verify their email address again
        setValidCode(false);
      } finally {
        setLoading(false);
      }
    };
    applyActionCode();
  }, [actionCode]);

  if (loading) {
    return <LoadingDiv />;
  }

  if (validCode) {
    return (
      <>
        <div>
          <CheckMark />
        </div>
        <Typography variant="h6" align="center">
          Your email has been verified.
        </Typography>

        <Typography variant="body1" align="center" gutterBottom>
          You can now sign in with your new account.
        </Typography>
        <Link to={SIGNIN_ROUTE} className={classes.link}>
          <Button type="submit" variant="contained" color="primary">
            Sign in
          </Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Typography variant="h4" align="center" className={classes.errorText}>
        Error
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        className={classes.errorText}
      >
        Your email has already been verified, or the verification code has
        expired. <br /> Try verifying email again by resending a verification
        code, or trying to log in.
      </Typography>
    </>
  );
};

export default VerifyEmailAction;
