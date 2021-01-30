import React from "react";
import Typography from "@material-ui/core/Typography";
import VerifyEmailAction from "./VerifyEmailAction";
import RecoverEmailAction from "./RecoverEmailAction";
import ResetPasswordAction from "./ResetPasswordAction";
import { useLocation } from "react-router-dom";
import AuthContainer from "../AuthContainer";

// mode - The user management action to be completed
// oobCode - A one-time code, used to identify and verify a request
// apiKey - Firebase project's API key, provided for convenience
const AuthAction = () => {
  const location = useLocation();
  const search = location.search;
  const urlSearchParams = new URLSearchParams(search);
  // Get the action to complete.
  const mode = urlSearchParams.get("mode");
  // Get the one-time code from the query parameter.
  const actionCode = urlSearchParams.get("oobCode") || "";
  // (Optional) Get the API key from the query parameter.
  // const apiKey = urlSearchParams.get('apiKey');

  // Handle the user management action.
  let authActionComponent = null;
  switch (mode) {
    // Display recover email handler and UI.
    case "recoverEmail":
      authActionComponent = <RecoverEmailAction actionCode={actionCode} />;
      break;
    // Display reset password handler and UI.
    case "resetPassword":
      authActionComponent = <ResetPasswordAction actionCode={actionCode} />;
      break;
    // Display email verification handler and UI.
    case "verifyEmail":
      authActionComponent = <VerifyEmailAction actionCode={actionCode} />;
      break;
    // Error: invalid mode.
    default:
      authActionComponent = (
        <>
          <Typography variant="h4" align="center">
            Error encountered
          </Typography>
          <Typography variant="h6" align="center" style={{ marginTop: 16 }}>
            The selected page mode is invalid.
          </Typography>
        </>
      );
  }

  return (
    <AuthContainer maxWidth="sm">
      <div
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {authActionComponent}
      </div>
    </AuthContainer>
  );
};

export default AuthAction;
