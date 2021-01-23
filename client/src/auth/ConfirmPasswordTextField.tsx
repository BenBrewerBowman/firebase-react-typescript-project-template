import { TextField } from "@material-ui/core";

type Props = {
  valid: boolean;
  onChangeValid: (valid: boolean) => void;
  showPassword: boolean;
  primaryPassword: string;
  className?: string;
};

const ConfirmPasswordTextField = ({
  valid,
  onChangeValid,
  showPassword,
  primaryPassword,
  className,
}: Props) => {
  return (
    <TextField
      color="secondary"
      margin="normal"
      error={!valid}
      helperText={!valid && "Password does not match"}
      required
      label="Confirm password"
      autoComplete="password"
      name="confirmPassword"
      id="confirmPassword"
      type={showPassword ? "text" : "password"}
      variant="outlined"
      className={className}
      size="small"
      onChange={(e) => {
        onChangeValid(e.target.value === primaryPassword);
      }}
    />
  );
};

export default ConfirmPasswordTextField;
