import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarNotificationProvider } from "./snackbarNotification";
import { createTheme } from "./theme";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SigninSignupPage from "./signinSignup/SigninSignupPage";

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={createTheme("light")}>
      <CssBaseline />
      <SnackbarNotificationProvider>
        <Router>
          <Switch>
            <Route path="/signin">
              <SigninSignupPage />
            </Route>
            <Route path="/signup">
              <SigninSignupPage />
            </Route>
          </Switch>
        </Router>
      </SnackbarNotificationProvider>
    </ThemeProvider>
  );
};

export default App;
