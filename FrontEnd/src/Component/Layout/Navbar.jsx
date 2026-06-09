import React, { useState } from "react";
import {FaBars} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // pc
  const ActivePage = "bg-rose-300 text-rose-600";
  const NormalPage = "hover:bg-rose-200 text-rose-600";

  // mobile
  const ActiveMob = "p-2 bg-rose-300 text-rose-600";
  const NormalMob = "hover:bg-rose-200 text-rose-600";

  return (
    <>
      {/* for PC */}
      <div className="md:flex justify-between hidden py-2 shadow-2xl">
        <div>
          <img src="#" alt="" />
          LOGO
        </div>

        <div className="flex gap-15 pr-6">
          <NavLink to='/' className= {({isActive})=>`px-4 py-2 rounded-lg cursor-pointer ${isActive ? ActivePage  : NormalPage }`}>
            Home
          </NavLink>
          <NavLink to='/findDonor' className= {({isActive})=>`px-4 py-2 rounded-lg cursor-pointer ${isActive ? ActivePage : NormalPage}`}>
            Find Donor
          </NavLink>
          <NavLink to='/bloodBanks' className= {({isActive})=>`px-4 py-2 rounded-lg cursor-pointer ${isActive ? ActivePage : NormalPage}`}>
            Blood Banks
          </NavLink>
          <NavLink to='/dashboard' className= {({isActive})=>`px-4 py-2 rounded-lg cursor-pointer ${isActive ? ActivePage : NormalPage}`}>
            Dashboard
          </NavLink>

          <NavLink to='' className={({isActive})=>`px-4 py-2 bg-rose-600 text-white rounded-lg cursor-pointer ${isActive ? ActivePage : "hover:bg-rose-300 hover:text-rose-600"}`}>
            Sign in/Register
          </NavLink>
        </div>
      </div>

      {/* mobile */}
      <div className="flex md:hidden shadow-2xl">
        <div className="flex flex-col w-screen bg-rose-400">
          <div className="flex justify-between p-3">
          <div>
            <img src="" alt="" />
            LOGO
          </div>
          <div onClick={() => setOpen(!open)} className="font-bold text-2xl">
            <FaBars/>
          </div>
          </div>

        <div className={`flex flex-col bg-gray-200 shadow-2xl overflow-hidden transition-all duration-300 ${open ? "max-h-70 p-2 gap-4" : "max-h-0 p-0"}`}>
          <NavLink to="/" className={({isActive})=>`p-2 rounded-lg cursor-pointer ${isActive ? ActiveMob : NormalMob}`}>
            Home
          </NavLink>
          <NavLink to="/findDonor" className={({isActive})=>`p-2 rounded-lg cursor-pointer ${isActive ? ActiveMob  : NormalMob}`}>
            Find Donor
          </NavLink>
          <NavLink to="bloodBanks" className={({isActive})=>`p-2 rounded-lg cursor-pointer ${isActive ? ActiveMob : NormalMob}`}>
            Blood Banks
          </NavLink>
          <NavLink to="dashBoard" className={({isActive})=>`p-2 rounded-lg cursor-pointer ${isActive ? ActiveMob : NormalMob}`}>
            Dashboard
          </NavLink>
          
          <NavLink to="register/signIn" className="text-center px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg cursor-pointer">
            Sign in/Register
          </NavLink>
        </div>

        </div>
        </div>

        
      
    </>
  );
};

export default Navbar;
