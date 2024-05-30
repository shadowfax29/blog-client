import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleProfile = (profile) => {
    setUser(profile);
    
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, handleProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
