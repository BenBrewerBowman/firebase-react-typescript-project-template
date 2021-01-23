import {
  createStyles,
  Grid,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Redirect, useLocation, useRouteMatch } from "react-router-dom";
import { APP_LANDING, RESET_PASSWORD_PATH } from "../constants";
import { SECONDARY_GRADIENT, Theme } from "../theme";
import AuthContainer from "./AuthContainer";
import EmailVerification from "./EmailVerification";
import { ReactComponent as ForgotPasswordImg } from "./forgot_password.svg";
import { ReactComponent as LoginImg } from "./login_dashboard.svg";
import { ReactComponent as Logo } from "./logo.svg";
import { ReactComponent as NewAccountImg } from "./new_account.svg";
import { ReactComponent as NewEmailImg } from "./new_email.svg";
import ResetPassword from "./ResetPassword";
import SigninSignupForm from "./SigninSignupForm";
import { useSession } from "./useSession";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imgContainer: {
      background: SECONDARY_GRADIENT,
      opacity: 0.9,
      display: "flex",
      alignItems: "center",
    },
    contentContainer: {
      padding: theme.spacing(5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
    },
    logo: {
      height: 56,
      width: 56,
      marginBottom: theme.spacing(4),
    },
    img: {
      width: "100%",
      height: "auto",
      maxHeight: "80%",
      marginLeft: theme.spacing(-4),
    },
  })
);

type SigninSignupPageProps = {
  variant: "signup" | "signin";
};

const SigninSignupPage = ({ variant }: SigninSignupPageProps) => {
  const classes = useStyles();

  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const location = useLocation();
  const from = (location?.state as any)?.from?.pathname || APP_LANDING;

  const resetPasswordMatch = useRouteMatch({
    path: RESET_PASSWORD_PATH,
  });

  const { user } = useSession();
  // if user authed, redirect to home dashboard
  if (user?.emailVerified) {
    return <Redirect to={from} />;
  }

  let component = null;
  let Img = LoginImg;

  if (resetPasswordMatch) {
    component = <ResetPassword />;
    Img = ForgotPasswordImg;
  } else if (user) {
    component = <EmailVerification />;
    Img = NewEmailImg;
  } else {
    component = <SigninSignupForm variant={variant} from={from} />;
    Img = variant === "signin" ? LoginImg : NewAccountImg;
  }

  return (
    <AuthContainer>
      <Grid container>
        <Grid item xs={12} md={6} lg={5} className={classes.contentContainer}>
          <Logo className={classes.logo} />
          {component}
        </Grid>
        {!isSm && (
          <Grid item md={6} lg={7} className={classes.imgContainer}>
            <Img className={classes.img} />
          </Grid>
        )}
      </Grid>
    </AuthContainer>
  );
};

export default SigninSignupPage;
