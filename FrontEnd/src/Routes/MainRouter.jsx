import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Layout/Navbar";
import Footer from "../Component/Layout/Footer";

const MainRouter = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainRouter;
