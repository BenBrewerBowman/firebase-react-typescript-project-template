import { Button, Typography } from "@material-ui/core";
import { useLogout } from "../auth/logout";

const LandingPage = () => {
  const logout = useLogout();
  return (
    <>
      <Typography variant="h3">You&#39;re authed!</Typography>
      <Button variant="contained" size="large" color="primary" onClick={logout}>
        Log out
      </Button>
    </>
  );
};

export default LandingPage;
