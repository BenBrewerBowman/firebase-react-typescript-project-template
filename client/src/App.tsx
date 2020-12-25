import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarNotificationProvider } from "./snackbarNotification";
import { createTheme } from "./theme";

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={createTheme("light")}>
      <CssBaseline />
      <SnackbarNotificationProvider>
        <main></main>
      </SnackbarNotificationProvider>
    </ThemeProvider>
  );
};

export default App;
