import { useState, useEffect, createContext } from "react";
export const SessionContext = createContext(null);

const protectedSession = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "http://localhost/LifeFlow/Blood-Donation/BackEnd/auth/checkSession.php",
      {
        credentials: "include",
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedIn) {
          setUser(data.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export default protectedSession;
