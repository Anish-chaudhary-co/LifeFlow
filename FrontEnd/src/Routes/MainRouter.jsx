import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import FindDonor from "../Pages/FindDonor";
import BloodBanks from "../Pages/BloodBanks";
import DashBoard from "../Pages/DashBoard";
import RegisterSignIn from "../Pages/Register/RegisterSignIn";
import SignIn from "../Component/Layout/signIn";
import Register from "../Component/Layout/register";
const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/findDonor" element={<FindDonor />} />
      <Route path="/bloodBanks" element={<BloodBanks />} />
      <Route path="/dashBoard" element={<DashBoard />} />
      <Route path="/RegisterSignIn" element={<RegisterSignIn />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default MainRouter;
