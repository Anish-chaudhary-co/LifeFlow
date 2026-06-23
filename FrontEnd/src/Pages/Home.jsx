import React from "react";
import { NavLink } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import QuickDonorSearch from "../Component/Home/QuickDonorSearch";
import TotalUser from "../Component/Home/TotalUser";

const Home = () => {
  return (
    <div className="mt-14">
      <div className=" p-6 md:p-10">
        <span className="font-bold text-xs px-2 rounded-2xl bg-rose-300 text-rose-500">14 ACTIVE EMERGENCIES NEAR YOU</span>

        <div className="grid grid-cols-1 md:grid-cols-2 relative">
          <div className="flex flex-col gap-3">
          <h2 className="font-bold text-4xl">Every drop is a <span className="text-rose-500">LifeLine</span>.</h2>
           <p className="text-gray-400">LifeFlow matches verified donors with patients in critical need instantly, locally, and securely.</p>
          </div>

          <div className="flex gap-20 mt-8 md:absolute bottom-2 right-50">
            <NavLink to='/findDonor' className="flex gap-2 text-center py-2 px-2 border text-white bg-rose-500 rounded-lg">Find Donor <FaArrowCircleRight className="mt-1"/></NavLink>
            <NavLink to='/donateBlood' className="py-2 px-2 border rounded-lg">Donate Blood</NavLink>
          </div>
        </div>

        {/* for show the number of donor */}
      <div className="flex mt-8 gap-4">
        <div className="px-4 py-4 rounded-4xl border"></div>
        <div className="flex flex-col">
        <div><span>4345+</span> donors</div>
        <span className="text-gray-500">already saving lives in your city</span>
        </div>
      </div>

      </div>

      <QuickDonorSearch/>
      <TotalUser/>
    </div>
  );
};

export default Home;
