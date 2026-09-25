import { useState, createContext } from "react";
export const UserContext = createContext(null);

const AuthContext = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null);
  return (
    <UserContext.Provider
      value={{
        notification,
        setNotification,
        user,
        setUser,
        patient,
        setPatient,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;
