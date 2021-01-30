import {
  Button,
  Checkbox,
  createStyles,
  Divider,
  FormControlLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useBooleanState } from "react-use-object-state";
import {
  APP_NAME,
  RESET_PASSWORD_PATH,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
} from "../constants";
import { Theme } from "../theme";
import ConfirmPasswordTextField from "./ConfirmPasswordTextField";
import EmailTextField from "./EmailTextField";
import { ReactComponent as GoogleLogo } from "./google_logo.svg";
import PasswordTextField from "./PasswordTextField";
import Recaptcha from "./Recaptcha";
import {
  signinWithGoogle,
  useSigninWithEmail,
  useSignupWithEmail,
} from "./signinProviders";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      marginBottom: theme.spacing(4),
    },
    button: {
      marginBottom: theme.spacing(2),
      maxWidth: 304,
      width: "100%",
    },
    buttonLogo: {
      marginRight: theme.spacing(2),
      width: 24,
      height: 24,
      fontSize: 24,
    },
    dividerSection: {
      margin: theme.spacing(3, 0, 5, 0),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    divider: {
      flexGrow: 1,
    },
    dividerSectionText: {
      margin: theme.spacing(0, 2),
    },
    input: {
      maxWidth: 304,
      width: "100%",
      marginBottom: theme.spacing(2),
      marginTop: 0,
    },
    img: {
      width: "100%",
      height: "80%",
      marginLeft: theme.spacing(-5),
    },
    link: {
      color: "inherit",
    },
    presubmitSection: {
      marginTop: theme.spacing(2),
    },
    rememberMe: {
      margin: theme.spacing(-1.25, 0, 0.75, 0),
      maxWidth: 320,
      width: "100%",
    },
    forgotPassword: {
      marginBottom: theme.spacing(2),
    },
    signinLink: {
      marginLeft: theme.spacing(1),
      color: "inherit",
    },
  })
);

type SigninSignupPageProps = {
  variant: "signup" | "signin";
  from: string;
};

const SigninSignupForm = ({ variant, from }: SigninSignupPageProps) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const emailValid = useBooleanState(true);

  const [password, setPassword] = useState("");
  const passwordValid = useBooleanState(true);

  const confirmPasswordValid = useBooleanState(true);

  const showPassword = useBooleanState(false);

  const rememberMe = useBooleanState(false);

  const history = useHistory();

  const signinWithEmail = useSigninWithEmail();
  const handleSigninWithEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailValid.state || !passwordValid.state) {
      return;
    }
    signinWithEmail(
      {
        email,
        password,
        rememberMe: rememberMe.state,
      },
      () => history.push(from)
    );
  };

  const signupWithEmail = useSignupWithEmail();
  const handleSignupWithEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !emailValid.state ||
      !passwordValid.state ||
      !confirmPasswordValid.state
    ) {
      return;
    }
    signupWithEmail(
      {
        email,
        password,
      },
      () => history.push(from)
    );
  };

  return (
    <>
      <Typography variant="h4" align="center" className={classes.title}>
        {variant === "signin"
          ? `${APP_NAME} Sign In`
          : `Welcome to ${APP_NAME}`}
      </Typography>

      <Button
        variant="outlined"
        onClick={signinWithGoogle}
        className={classes.button}
      >
        <GoogleLogo className={classes.buttonLogo} />
        Google {variant === "signin" ? "sign in" : "sign up"}
      </Button>
      {/* <Button variant="outlined" className={classes.button}>
                <MicrosoftLogo className={classes.buttonLogo} />
                Microsoft {variant}
              </Button> */}
      {/* <Button
        variant="outlined"
        onClick={signinWithGithub}
        className={classes.button}
      >
        <GithubLogo className={classes.buttonLogo} />
        Github {variant}
      </Button> */}
      <div className={classes.dividerSection}>
        <Divider className={classes.divider} />
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.dividerSectionText}
        >
          Or {variant === "signin" ? "sign in" : "sign up"} with email
        </Typography>
        <Divider className={classes.divider} />
      </div>
      <form
        onSubmit={
          variant === "signin" ? handleSigninWithEmail : handleSignupWithEmail
        }
        className={classes.form}
      >
        <EmailTextField
          email={email}
          onChangeEmail={setEmail}
          onChangeValid={emailValid.setState}
          valid={emailValid.state}
          className={classes.input}
        />
        <PasswordTextField
          onChangePassword={setPassword}
          onChangeValid={passwordValid.setState}
          onChangeShowPassword={showPassword.toggle}
          showPassword={showPassword.state}
          className={classes.input}
        />
        {variant === "signup" && (
          <ConfirmPasswordTextField
            valid={confirmPasswordValid.state}
            onChangeValid={confirmPasswordValid.setState}
            showPassword={showPassword.state}
            primaryPassword={password}
            className={classes.input}
          />
        )}
        {variant === "signup" && <Recaptcha />}

        {variant === "signin" && (
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe.state}
                onChange={rememberMe.toggle}
                color="primary"
                size="small"
              />
            }
            label={
              <Typography variant="body2" color="textSecondary">
                Remember me
              </Typography>
            }
            className={classes.rememberMe}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          type="submit"
        >
          {variant === "signin" ? "Sign in" : "Create new account"}
        </Button>
        {variant === "signin" && (
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.forgotPassword}
          >
            <Link to={RESET_PASSWORD_PATH} className={classes.link}>
              Forgot your password?
            </Link>
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary">
          {variant === "signin" ? "Don't" : "Already"} have an account?
          <Link
            to={variant === "signin" ? SIGNUP_ROUTE : SIGNIN_ROUTE}
            className={classes.signinLink}
          >
            {variant === "signin" ? "Create new account" : "Signin"}
          </Link>
        </Typography>
      </form>
    </>
  );
};

export default SigninSignupForm;
