import {
  createStyles,
  FormControl,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { useEffect, useRef } from "react";
import { useBooleanState } from "react-use-object-state";
import { Theme } from "../theme";
import firebase from "firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    recaptcha: {
      marginBottom: theme.spacing(2),
      width: 304,
    },
  })
);

type WindowWithRecaptcha = Window &
  typeof globalThis & {
    recaptchaVerifier?: firebase.auth.RecaptchaVerifier;
    recaptchaWidgetId?: number;
  };

const Recaptcha = () => {
  const classes = useStyles();

  const recaptchaVerified = useBooleanState(false);
  const recaptchaError = useBooleanState(false);

  const recaptcha = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setupRecaptcha = async () => {
      (window as WindowWithRecaptcha).recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        recaptcha.current,
        {
          size: "normal",
          callback: () => {
            recaptchaVerified.setTrue();
            recaptchaError.setFalse();
          },
          "expired-callback": () => {
            recaptchaVerified.setFalse();
            recaptchaError.setTrue();
          },
        }
      );
      (window as WindowWithRecaptcha).recaptchaWidgetId = await (window as WindowWithRecaptcha).recaptchaVerifier?.render();
    };
    setupRecaptcha();
    // eslint-disable-next-line
  }, []);

  return (
    <FormControl
      error={!recaptchaVerified.state && recaptchaError.state}
      fullWidth
      className={classes.recaptcha}
    >
      <div ref={recaptcha} />
      {recaptchaError.state && (
        <FormHelperText id="name-error-text">
          Please verify you are a human
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Recaptcha;
