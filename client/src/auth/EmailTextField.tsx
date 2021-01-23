import { TextField } from "@material-ui/core";

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type Props = {
  validEmailRegex?: RegExp;
  email: string;
  onChangeEmail: (email: string) => void;
  onChangeValid: (valid: boolean) => void;
  valid: boolean;
  className?: string;
};

const EmailTextField = ({
  validEmailRegex = EMAIL_REGEX,
  email,
  onChangeEmail,
  onChangeValid,
  valid,
  className,
}: Props) => {
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (email) {
      const isValidEmail =
        email.length !== 0 && email.match(validEmailRegex) !== null;
      onChangeValid(isValidEmail);
    }
  };

  return (
    <TextField
      id="email"
      color="secondary"
      name="email"
      autoComplete="email"
      onChange={(e) => {
        onChangeEmail(e.target.value);
        onChangeValid(true);
      }}
      onBlur={handleBlur}
      label="Email"
      variant="outlined"
      size="small"
      required
      error={Boolean(email) && !valid}
      helperText={Boolean(email) && !valid && "Email is not valid"}
      className={className}
    />
  );
};

export default EmailTextField;
