import { use } from "react";
import { useState, useEffect } from "react";

const successfulDonatedConfirm = () => {
  const handleConfirmDonor = async () => {
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/Dashboard/confirmedDonors.php",
        {
          method: "GET",
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result.success) {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleConfirmDonor();
  }, []);
  return <div>{}</div>;
};

export default successfulDonatedConfirm;
