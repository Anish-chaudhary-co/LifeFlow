import { useState } from "react";
import { UserPersonalContext } from "./UserPersonalContext";

const PersonalDetailContext = ({ children }) => {
  const [showDetail, setShowDetail] = useState(null);
  return (
    <UserPersonalContext.Provider value={{ showDetail, setShowDetail }}>
      {children}
    </UserPersonalContext.Provider>
  );
};

export default PersonalDetailContext;
