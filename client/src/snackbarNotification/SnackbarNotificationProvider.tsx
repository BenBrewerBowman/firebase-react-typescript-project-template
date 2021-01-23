import { ReactNode, useState } from "react";
import { SnackbarNotification } from "./SnackbarNotification";
import {
  SnackbarNotificationContextState,
  SnackbarNotificationVariant,
} from "./SnackbarNotification.types";
import { SnackbarNotificationContext } from "./SnackbarNotificationContext";

type SnackbarNotificationProviderProps = {
  children: ReactNode;
};

export const SnackbarNotificationProvider = ({
  children,
}: SnackbarNotificationProviderProps) => {
  const [state, setState] = useState<SnackbarNotificationContextState>({
    variant: SnackbarNotificationVariant.INFO,
    isOpen: false,
    message: "",
  });

  const showNotification = (
    variant: SnackbarNotificationVariant,
    message: string
  ) => {
    setState({
      variant,
      message,
      isOpen: true,
    });
  };

  const closeNotification = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return (
    <SnackbarNotificationContext.Provider
      value={{
        ...state,
        info: (message) =>
          showNotification(SnackbarNotificationVariant.INFO, message),
        success: (message) =>
          showNotification(SnackbarNotificationVariant.SUCCESS, message),
        warning: (message) =>
          showNotification(SnackbarNotificationVariant.WARNING, message),
        error: (message) =>
          showNotification(SnackbarNotificationVariant.ERROR, message),
        closeNotification,
      }}
    >
      <SnackbarNotification />
      {children}
    </SnackbarNotificationContext.Provider>
  );
};
