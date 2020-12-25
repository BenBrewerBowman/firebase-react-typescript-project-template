import { createContext, useContext } from "react";
import { SnackbarNotificationContext as T_SnackbarNotificationContext } from "./SnackbarNotification.types";

export const SnackbarNotificationContext = createContext<T_SnackbarNotificationContext>(
  {} as T_SnackbarNotificationContext
);

export const useSnackbarNotification = () =>
  useContext(SnackbarNotificationContext);
