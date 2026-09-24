import { useContext, useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { MdDashboard, MdHistory } from "react-icons/md";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

import { UserContext } from "../../Context/AuthContext";
const API_URL =
  "http://localhost/LifeFlow/Blood-Donation/BackEnd/auth/logout.php";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout request failed");
      }

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setUser(null);
        navigate("/signIn");
      } else {
        alert(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed.Backend");
    }
  };
  return (
    <>
      <div className="md:flex hidden min-h-screen">
        <aside className="h-screen w-72 border-r border-slate-300 bg-white p-6">
          <div className="flex justify-between">
            <p className="font-bold text-xl">logo</p>
            <NavLink
              to="/"
              className="flex items-center gap-3 hover:text-rose-500"
            >
              <FaHome size={20} />
              Home
            </NavLink>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="mt-10 flex flex-col gap-4">
              <span className="text-slate-400 font-bold text-lg">
                DASHBOARD
              </span>
              <NavLink
                to="/dashboard/overview"
                className={({ isActive }) =>
                  `flex items-center gap-3 text-slate-600 p-2 rounded-lg hover:text-black hover:bg-rose-500 ${isActive ? "bg-rose-400" : "bg-white"}`
                }
              >
                <MdDashboard size={20} />
                OverView
              </NavLink>
              <NavLink
                to="/dashboard/myProfile"
                className={({ isActive }) =>
                  `flex items-center gap-3 text-slate-600 p-2 rounded-lg hover:text-black hover:bg-rose-500 ${isActive ? "bg-rose-400" : "bg-white"} `
                }
              >
                <FaUser size={20} /> My profile
              </NavLink>
              <NavLink
                to="/dashboard/appointment"
                className={({ isActive }) =>
                  `flex items-center gap-3 text-slate-600 p-2 rounded-lg hover:text-black hover:bg-rose-500 ${isActive ? "bg-rose-400" : "bg-white"} `
                }
              >
                <FaCalendarAlt size={20} /> Appointment
              </NavLink>
              <NavLink
                to="/dashboard/donationHistory"
                className={({ isActive }) =>
                  `flex items-center gap-3 text-slate-600 p-2 rounded-lg hover:text-black hover:bg-rose-500 ${isActive ? "bg-rose-400" : "bg-white"} `
                }
              >
                <MdHistory size={20} /> Donation history
              </NavLink>
            </div>

            <div>
              <span className="font-semibold">SUPPORT</span>
              <div className="flex flex-col gap-3 mt-2 mb-6">
                <NavLink className="flex gap-3 items-center  hover:text-rose-500">
                  <MdHelpOutline size={20} />
                  Help center
                </NavLink>
                <NavLink className="flex gap-3 items-center  hover:text-rose-500">
                  <MdSettings size={20} />
                  Setting
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex gap-3 items-center  hover:text-rose-500"
                >
                  <MdLogout size={20} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* side content to show */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* for mobile */}
      <div className="md:hidden">
        <div className="flex fixed top-0 justify-between items-center w-screen h-16 border-b border-slate-300 bg-rose-400 px-6">
          <p className="font-bold text-xl">logo</p>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen(!open)}
            className="p-2"
          >
            {open ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <div
          className={`fixed left-0 top-16 z-50 flex h-[calc(100vh-4rem)] w-64 flex-col bg-gray-700 p-4 shadow-2xl transition-transform duration-200 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 text-white hover:text-rose-500"
          >
            <FaHome size={20} />
            Home
          </NavLink>

          <div className="mt-6 flex h-full flex-col justify-between">
            <div className="flex flex-col gap-4">
              <span className="text-slate-400 font-bold text-lg">
                DASHBOARD
              </span>
              <NavLink
                to="/dashboard/overview"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 text-slate-600 p-2 rounded-lg hover:text-black hover:bg-rose-500 ${isActive ? "bg-rose-400" : "bg-white"}`
                }
              >
                <MdDashboard size={20} />
                OverView
              </NavLink>
              <NavLink
                to="/dashboard/myProfile"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 text-slate-600 p-2 rounded-lg hover:text-black hover:bg-rose-500 ${isActive ? "bg-rose-400" : "bg-white"} `
                }
              >
                <FaUser size={20} /> My profile
              </NavLink>
              <NavLink
                to="/dashboard/appointment"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 text-slate-600 p-2 rounded-lg hover:text-black hover:bg-rose-500 ${isActive ? "bg-rose-400" : "bg-white"} `
                }
              >
                <FaCalendarAlt size={20} /> Appointment
              </NavLink>
              <NavLink
                to="/dashboard/donationHistory"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 text-slate-600 p-2 rounded-lg hover:text-black hover:bg-rose-500 ${isActive ? "bg-rose-400" : "bg-white"} `
                }
              >
                <MdHistory size={20} /> Donation history
              </NavLink>
            </div>

            <div>
              <span className="font-semibold text-white">SUPPORT</span>
              <div className="mt-2 mb-6 flex flex-col gap-3">
                <NavLink className="flex gap-3 items-center text-white hover:text-rose-500">
                  <MdHelpOutline size={20} />
                  Help center
                </NavLink>
                <NavLink className="flex gap-3 items-center text-white hover:text-rose-500">
                  <MdSettings size={20} />
                  Setting
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex gap-3 items-center text-left text-white hover:text-rose-500"
                >
                  <MdLogout size={20} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Navbar;
