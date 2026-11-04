import { createContext, useState, useEffect } from "react";
export const CheckSessionContext = createContext(null);

const checkSession = ({ children }) => {
  const [userSession, setUserSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleSession = async () => {
      try {
        const response = await fetch(
          "http://localhost/LifeFlow/Blood-Donation/BackEnd/auth/checkSession.php",
          {
            method: "GET",
            credentials: "include",
          },
        );
        const result = await response.json();
        setUserSession(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    handleSession();
  }, []);
  return (
    <div>
      <CheckSessionContext value={{ userSession, setUserSession }}>
        {children}
      </CheckSessionContext>
    </div>
  );
};

export default checkSession;
