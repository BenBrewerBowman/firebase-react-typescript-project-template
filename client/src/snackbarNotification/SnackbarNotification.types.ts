export enum SnackbarNotificationVariant {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
}

export type SnackbarNotificationContextState = {
  variant: SnackbarNotificationVariant;
  isOpen: boolean;
  message: string;
};

export type SnackbarNotificationContext = SnackbarNotificationContextState & {
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
  closeNotification: VoidFunction;
};
