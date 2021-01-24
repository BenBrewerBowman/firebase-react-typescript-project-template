import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarNotificationProvider } from "./snackbarNotification";
import { createTheme } from "./theme";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  APP_LANDING,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
  FIREBASE_CONFIG,
  AUTH_ACTION_PATH,
} from "./constants";
import SigninSignupPage from "./auth/SigninSignupPage";
import PrivateRoute from "./auth/PrivateRoute";
import { SessionProvider } from "./auth/useSession";
import firebase from "firebase";
import AuthAction from "./auth/authActions/AuthAction";
import { Suspense } from "react";
import LandingPage from "./landing/LandingPage";

// init firebase
const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
// init and expose db
export const db = firebaseApp.firestore();

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={createTheme("light")}>
      <CssBaseline />
      <SnackbarNotificationProvider>
        <SessionProvider>
          <Router>
            <Suspense fallback={<div />}>
              <Switch>
                <Route path={SIGNIN_ROUTE}>
                  <SigninSignupPage variant="signin" />
                </Route>
                <Route path={SIGNUP_ROUTE}>
                  <SigninSignupPage variant="signup" />
                </Route>
                <Route path={AUTH_ACTION_PATH}>
                  <AuthAction />
                </Route>
                <PrivateRoute path={APP_LANDING}>
                  <LandingPage />
                </PrivateRoute>
                <Redirect to={APP_LANDING} />
              </Switch>
            </Suspense>
          </Router>
        </SessionProvider>
      </SnackbarNotificationProvider>
    </ThemeProvider>
  );
};

export default App;
