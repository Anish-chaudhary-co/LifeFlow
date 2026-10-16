import { useState } from "react";
import { UserPersonalContext } from "./UserPersonalContext";

const profileShowContext = ({ children }) => {
  const [profile, setProfile] = useState(null);
  return (
    <UserPersonalContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserPersonalContext.Provider>
  );
};

export default profileShowContext;
