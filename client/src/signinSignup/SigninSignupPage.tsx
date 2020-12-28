import {
  Button,
  Container,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { PRIMARY_GRADIENT, Theme } from "../theme";
import { ReactComponent as Logo } from "./logo.svg";
import { ReactComponent as GoogleLogo } from "./google_logo.svg";
import { ReactComponent as MicrosoftLogo } from "./microsoft_logo.svg";
import { ReactComponent as GithubLogo } from "./github_logo.svg";
import { ReactComponent as LoginDashboardLogo } from "./login_dashboard.svg";
import EmailTextField from "./EmailTextField";
import PasswordTextField from "./PasswordTextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
      height: "100vh",
      backgroundImage: PRIMARY_GRADIENT,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      // display: "flex",
      // alignItems: "center",
      // justifyContent: "center",
    },
    paper: {
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      },
      overflowY: "auto",
      padding: 0,
      opacity: 0.9,
    },
    imgContainer: {
      backgroundColor: theme.palette.secondary.dark,
      opacity: 0.9,
      display: "flex",
      alignItems: "center",
    },
    contentContainer: {
      padding: theme.spacing(5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    logo: {
      height: 56,
      width: 56,
      marginBottom: theme.spacing(4),
    },
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
      maxWidth: 280,
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
    email: {
      maxWidth: 280,
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    img: {
      width: "100%",
      height: "80%",
      marginLeft: theme.spacing(-5),
    },
  })
);

// interface Props {}

export default function SigninSignupPage() {
  const classes = useStyles();
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <div className={classes.root}>
      <Container
        maxWidth="lg"
        disableGutters={isXs}
        className={classes.container}
      >
        <Paper elevation={0} className={classes.paper}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              lg={5}
              className={classes.contentContainer}
            >
              <Logo className={classes.logo} />
              <Typography variant="h4" className={classes.title}>
                FaqTrack Sign In
              </Typography>

              <Button variant="outlined" className={classes.button}>
                <GoogleLogo className={classes.buttonLogo} />
                Google sign in
              </Button>
              <Button variant="outlined" className={classes.button}>
                <MicrosoftLogo className={classes.buttonLogo} />
                Microsoft sign in
              </Button>
              <Button variant="outlined" className={classes.button}>
                <GithubLogo className={classes.buttonLogo} />
                Github sign in
              </Button>
              <div className={classes.dividerSection}>
                <Divider className={classes.divider} />
                <Typography
                  color="textSecondary"
                  className={classes.dividerSectionText}
                >
                  Or sign in with email
                </Typography>
                <Divider className={classes.divider} />
              </div>
              <form className={classes.form}>
                <EmailTextField
                  onChangeEmail={() => {}}
                  onChangeValid={() => {}}
                  className={classes.email}
                />
                <PasswordTextField
                  onChangeEmail={() => {}}
                  onChangeValid={() => {}}
                  className={classes.email}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  size="large"
                >
                  Sign in
                </Button>
              </form>
            </Grid>
            {!isSm && (
              <Grid item md={6} lg={7} className={classes.imgContainer}>
                <LoginDashboardLogo className={classes.img} />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
