import React from "react";
import RequestHistory from "./DashCompoent/requestHistory";
import PersonalDetailForm from "./DashCompoent/personalDetailForm";

const Myprofile = () => {
  return (
    <div className="mt-20">
      <PersonalDetailForm />
      <RequestHistory />
    </div>
  );
};

export default Myprofile;
