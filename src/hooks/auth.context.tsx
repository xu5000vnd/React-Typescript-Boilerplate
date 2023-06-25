import { createContext, useState, useEffect, ReactNode } from "react";
import AuthService from "../services/auth.service";
import { UserProfile } from "../common/types/user.type";
import UserService from "../services/user.service";

interface AuthContextProps {
  user: UserProfile | null;
  updateUser: (newValue: UserProfile) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  updateUser: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const updateUser = (newValue: UserProfile) => {
    setUser(newValue);
    return;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (AuthService.checkAuth()) {
          const userProfile = await UserService.getMyProfile();
          setUser(userProfile);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
