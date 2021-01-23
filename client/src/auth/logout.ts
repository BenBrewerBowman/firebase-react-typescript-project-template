import firebase from "firebase";
import { useSnackbarNotification } from "../snackbarNotification";

export const useLogout = () => {
  const notification = useSnackbarNotification();
  return () =>
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("account_ids");
        notification.success("Successfully signed out");
      })
      .catch(() => {
        notification.error(
          "Error signing out. Refresh the page and try again."
        );
      });
};
