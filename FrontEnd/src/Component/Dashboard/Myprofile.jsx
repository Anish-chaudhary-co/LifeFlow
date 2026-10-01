import React from "react";
import RequestHistory from "./DashCompoent/requestHistory";
import PersonalDetailForm from "./DashCompoent/personalDetailForm";

const Myprofile = () => {
  return (
    <div>
      <PersonalDetailForm />
      <RequestHistory />
    </div>
  );
};

export default Myprofile;
