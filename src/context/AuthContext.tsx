import { createContext } from "react";
import { User } from "firebase/auth";

export type AuthType = {
  user: User | null;
};

export type AuthContextType = AuthType & {
  setUser: React.Dispatch<React.SetStateAction<AuthType>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});
