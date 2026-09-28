import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/AuthContext";
const Patients = () => {
  const { patient } = useContext(UserContext);
  if (!patient) {
    return <p className="mt-20 text-2xl">Fetching data.......</p>;
  }

  return (
    <div className="mt-20">
      <span className="font-bold text-5xl">{patient.BloodType}</span>
    </div>
  );
};

export default Patients;
