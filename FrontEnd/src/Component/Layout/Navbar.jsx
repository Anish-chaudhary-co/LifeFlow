import React, { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { UserContext } from "../../Context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { notification, setNotification } = useContext(UserContext);
  const { user } = useContext(UserContext);

  // const handleDashboard = async () => {
  //   try {
  //     const data = await notification;
  //     const log = data.success;
  //     console.log(log);
  //     setIsLoggedIn(log);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // handleDashboard();

  // const promise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (notification.success) {
  //       resolve("Dashboard");
  //     } else {
  //       reject("Cannot fetch data");
  //     }
  //   }, 3000);
  // });

  // promise
  //   .then((result) => {
  //     setIsLoggedIn(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // pc
  const ActivePage = "bg-rose-400 text-white";
  const NormalPage = "hover:bg-rose-200 text-rose-600";

  // mobile
  const ActiveMob = "p-2 bg-rose-300 text-rose-600";
  const NormalMob = "hover:bg-rose-200 text-rose-600";

  return (
    <>
      {/* for PC */}
      <div className="fixed top-0 right-0 left-0 z-50 bg-rose-300 md:flex justify-between hidden py-2 shadow-2xl">
        <div>
          <img src="#" alt="" />
          LOGO
        </div>

        <div className="flex gap-15 pr-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg cursor-pointer ${isActive ? ActivePage : NormalPage}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/findDonor"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg cursor-pointer ${isActive ? ActivePage : NormalPage}`
            }
          >
            Find Donor
          </NavLink>
          <NavLink
            to="/requestBlood"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg cursor-pointer ${isActive ? ActivePage : NormalPage}`
            }
          >
            Request Blood
          </NavLink>
          <NavLink
            to="/patients"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg cursor-pointer ${isActive ? ActivePage : NormalPage}`
            }
          >
            Patients
          </NavLink>

          {user ? (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg cursor-pointer ${isActive ? ActivePage : NormalPage}`
              }
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              to="RegisterSignIn"
              className={({ isActive }) =>
                `px-4 py-2 bg-rose-600 text-white rounded-lg cursor-pointer ${isActive ? ActivePage : "hover:bg-rose-300 hover:text-rose-600"}`
              }
            >
              Sign in/Register
            </NavLink>
          )}
        </div>
      </div>

      {/* mobile */}

      <div className="flex flex-col md:hidden fixed top-0 right-0 left-0 w-screen bg-rose-400 z-50">
        <div className="flex justify-between p-3">
          <div>
            {/* <img src="" alt="" /> */}
            LOGO
          </div>
          <div onClick={() => setOpen(!open)} className="text-xl">
            {open ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <div
          className={`flex flex-col bg-gray-700 shadow-2xl overflow-hidden transition-all duration-200 ${open ? "max-h-70 p-2 gap-4" : "max-h-0 p-0"}`}
        >
          <NavLink
            to="/"
            onClick={() => setOpen(!open)}
            className={({ isActive }) =>
              `p-2 rounded-lg cursor-pointer ${isActive ? ActiveMob : NormalMob}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/findDonor"
            onClick={() => setOpen(!open)}
            className={({ isActive }) =>
              `p-2 rounded-lg cursor-pointer ${isActive ? ActiveMob : NormalMob}`
            }
          >
            Find Donor
          </NavLink>
          <NavLink
            to="/requestBlood"
            onClick={() => setOpen(!open)}
            className={({ isActive }) =>
              `p-2 rounded-lg cursor-pointer ${isActive ? ActiveMob : NormalMob}`
            }
          >
            Request Blood
          </NavLink>
          <NavLink
            to="patients"
            onClick={() => setOpen(!open)}
            className={({ isActive }) =>
              `p-2 rounded-lg cursor-pointer ${isActive ? ActiveMob : NormalMob}`
            }
          >
            Patients
          </NavLink>
          {user ? (
            <NavLink
              to="dashBoard"
              onClick={() => setOpen(!open)}
              className={({ isActive }) =>
                `p-2 rounded-lg cursor-pointer ${isActive ? ActiveMob : NormalMob}`
              }
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              to="RegisterSignIn"
              onClick={() => setOpen(!open)}
              className="text-center px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg cursor-pointer"
            >
              Sign in/Register
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
