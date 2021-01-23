import { createContext, ReactNode, useContext } from "react";
import firebase, { User } from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

type Session = {
  user?: User;
  loading: boolean;
};
export const SessionContext = createContext<Session>({ loading: true });

export const useSession = () => {
  return useContext(SessionContext);
};

type SessionProviderProps = {
  children: ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [user, loading] = useAuthState(firebase.auth());

  if (loading) return null;

  return (
    <SessionContext.Provider value={{ user, loading }}>
      {children}
    </SessionContext.Provider>
  );
};
