import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

const login = (userData, token) => {
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", token);

  if (userData.role === "Student" && userData.studentId) {
    localStorage.setItem("studentId", userData.studentId);
  }

  setUser(userData);
};

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;