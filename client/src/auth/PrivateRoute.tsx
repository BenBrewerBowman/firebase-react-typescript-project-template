import { Redirect, Route, RouteProps } from "react-router-dom";
import { SIGNIN_ROUTE } from "../constants";
import { useSession } from "./useSession";

type Props = RouteProps;

export default function PrivateRoute({ location, ...props }: Props) {
  const { user } = useSession();

  return user?.emailVerified ? (
    <Route {...props} location={location} />
  ) : (
    <Redirect
      to={{
        pathname: SIGNIN_ROUTE,
        state: { from: location },
      }}
    />
  );
}
