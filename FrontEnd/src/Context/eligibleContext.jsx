import { useState, createContext } from "react";

export const DonorEligibilityContext = createContext(null);

const eligibleContext = ({ children }) => {
  const [eligible, setEligible] = useState(null);
  const [loading, setLoading] = useState(true);
  return (
    <DonorEligibilityContext.Provider
      value={{ eligible, setEligible, loading, setLoading }}
    >
      {children}
    </DonorEligibilityContext.Provider>
  );
};

export default eligibleContext;
