import { createStyles, makeStyles, TextField } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import React, { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { Theme } from "../theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      padding: theme.spacing(0.5),
    },
  })
);

type Props = {
  onChangePassword: (password: string) => void;
  onChangeValid: (valid: boolean) => void;
  onChangeShowPassword: VoidFunction;
  showPassword: boolean;
  className?: string;
};

const errorMessages = {
  length: "between 6 and 26 characters",
  lowerCase: "one lowercase letter",
  upperCase: "one uppercase letter",
  number: "a number",
  specialChar: "a special character",
  noSpaces: "no spaces",
};

const PasswordTextField = ({
  onChangePassword,
  onChangeValid,
  onChangeShowPassword,
  showPassword,
  className,
}: Props) => {
  const classes = useStyles();
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = () => {
    if (errors.length > 0) {
      setErrors([]);
      onChangeValid(true);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const password = event.target.value;
    if (password) {
      onChangePassword(password);

      const errors = [];
      // length
      if (password.match(/^(?=.{6,26})/g) === null)
        errors.push(errorMessages.length);
      // lower case
      if (password.match(/^(?=.*[a-z])/g) === null)
        errors.push(errorMessages.lowerCase);
      // upper case
      if (password.match(/^(?=.*[A-Z])/g) === null)
        errors.push(errorMessages.upperCase);
      // number
      if (password.match(/^(?=.*[0-9])/g) === null)
        errors.push(errorMessages.number);
      // special char
      // if (password.match(/^(?=.*[!@#$%^&*])/g) === null) errors.push(errorMessages.specialChar);
      // spaces
      if (password.match(/\s/g) !== null) errors.push(errorMessages.noSpaces);

      onChangeValid(errors.length === 0);
      setErrors(errors);
    }
  };

  return (
    <TextField
      id="email"
      color="secondary"
      name="password"
      autoComplete="password"
      onChange={handleChange}
      onBlur={handleBlur}
      label="Password"
      variant="outlined"
      type={showPassword ? "text" : "password"}
      size="small"
      required
      className={className}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={onChangeShowPassword}
              className={classes.iconButton}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={Boolean(errors.length)}
      helperText={
        errors.length > 0 && (
          <>
            <FormHelperText id="name-error-text">
              Password must contain:
            </FormHelperText>
            {errors.map((error) => (
              <FormHelperText id="name-error-text">- {error}</FormHelperText>
            ))}
          </>
        )
      }
    />
  );
};

export default PasswordTextField;
