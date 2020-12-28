import React, { useState } from "react";
import { TextField } from "@material-ui/core";

// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type Props = {
  validEmailRegex?: RegExp;
  onChangeEmail: (email: string) => void;
  onChangeValid: (valid: boolean) => void;
  error?: string;
  className?: string;
};

const PasswordTextField = ({
  validEmailRegex = EMAIL_REGEX,
  onChangeEmail,
  onChangeValid,
  error,
  className,
}: Props) => {
  const [valid, setValid] = useState(true);

  const handleChange = () => {
    if (!valid) {
      onChangeValid(true);
      setValid(true);
    }
  };

  const handleBlur = (event: any) => {
    const email = event.target.value;
    if (email !== "") {
      onChangeEmail(email);
      const isValidEmail =
        email.length !== 0 && email.match(validEmailRegex) !== null;
      onChangeValid(isValidEmail);
      setValid(isValidEmail);
    }
  };

  return (
    <TextField
      id="email"
      color="secondary"
      name="email"
      autoComplete="email"
      onChange={handleChange}
      onBlur={handleBlur}
      label="Password"
      variant="filled"
      className={className}
    />

    // <FormControl
    //   margin="normal"
    //   error={!valid || error !== ""}
    //   required
    //   fullWidth
    //   variant="filled"
    // >
    //   <InputLabel htmlFor="email" color="primary">
    //     Email Address
    //   </InputLabel>
    //   <Input
    //     color="primary"
    //     id="email"
    //     name="email"
    //     autoComplete="email"
    //     autoFocus
    //     onChange={handleChange}
    //     onBlur={handleBlur}
    //   />
    //   {!valid && (
    //     <FormHelperText id="name-error-text">
    //       Please enter a valid email.
    //     </FormHelperText>
    //   )}
    //   {error && <FormHelperText id="name-error-text">{error}</FormHelperText>}
    // </FormControl>
  );
};

export default PasswordTextField;
