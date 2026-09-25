import { Routes, Route, Navigate } from "react-router-dom";
import MainRouter from "./MainRouter";
import Home from "../Pages/Home";
import FindDonor from "../Pages/FindDonor";
import Patients from "../Pages/Patients";
import RequestBlood from "../Pages/RequestBlood";
import DashBoard from "../Pages/DashBoard";
import RegisterSignIn from "../Pages/Register/RegisterSignIn";
import SignIn from "../Component/Layout/signIn";
import Register from "../Component/Layout/register";
import AuthContext from "../Context/AuthContext";
import Overview from "../Component/Dashboard/Overview";
import MyProfile from "../Component/Dashboard/Myprofile";
import Appointment from "../Component/Dashboard/Appointment";
import DonationHistory from "../Component/Dashboard/DonationHistory";

import ProtectedSession from "../Context/protectedSession";

const AppRouter = () => {
  return (
    <AuthContext>
      <Routes>
        <Route path="/" element={<MainRouter />}>
          <Route index element={<Home />} />
          <Route path="findDonor" element={<FindDonor />} />
          <Route path="patients" element={<Patients />} />
          <Route path="requestBlood" element={<RequestBlood />} />
          <Route path="RegisterSignIn" element={<RegisterSignIn />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* for Dashboard */}
        <Route element={<ProtectedSession />}>
          <Route path="/dashboard" element={<DashBoard />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="myProfile" element={<MyProfile />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="donationHistory" element={<DonationHistory />} />
          </Route>
        </Route>
      </Routes>
    </AuthContext>
  );
};

export default AppRouter;
