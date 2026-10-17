import { createContext, useState } from "react";
export const profileContext = createContext(null);

const profileShowContext = ({ children }) => {
  const [profile, setProfile] = useState(false);
  return (
    <profileContext.Provider value={{ profile, setProfile }}>
      {children}
    </profileContext.Provider>
  );
};

export default profileShowContext;
