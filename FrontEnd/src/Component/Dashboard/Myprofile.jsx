import React from "react";
import RequestHistory from "./DashComponent/requestHistory";
import PersonalDetailForm from "./DashComponent/personalDetailForm";

const MyProfile = () => {
  return (
    <div>
      <PersonalDetailForm />
      <RequestHistory />
    </div>
  );
};

export default MyProfile;
