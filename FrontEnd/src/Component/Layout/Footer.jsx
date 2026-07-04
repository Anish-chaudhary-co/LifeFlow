import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="p-2 bg-gray-300 shadow-gray-400 shadow-2xl mt-9">
      <div>LOGO</div>

      <div className="grid grid-cols-2 gap-9 pl-5 md:grid-cols-4 justify-between">
        <div>
          <span className="text-rose-400">
            Connecting verified donors with patients in need - clinical
            precision meets human compassion.
          </span>
          <div className="flex gap-4 mt-4">
            <div className="cursor-pointer hover:text-red-500">
              <FaTwitter />
            </div>
            <div className="cursor-pointer hover:text-red-500">
              <FaFacebook />
            </div>
            <div className="cursor-pointer hover:text-red-500">
              <FaInstagram />
            </div>
            <div className="cursor-pointer hover:text-red-500">
              <FaGoogle />
            </div>
          </div>
        </div>

        <div className="cursor-pointer">
          <span className="font-bold text-gray-500">PLATFORM</span>
          <ul>
            <li className="w-fit hover:text-red-500">Find Donor</li>
            <li className="w-fit hover:text-red-500">Request Blood</li>
            <li className="w-fit hover:text-red-500">Blood Banks</li>
          </ul>
        </div>

        <div className="cursor-pointer">
          <span className="font-bold text-gray-500">COMPANY</span>
          <ul>
            <li className="w-fit hover:text-red-500">Admin</li>
            <li className="w-fit hover:text-red-500">Privacy</li>
            <li className="w-fit hover:text-red-500">Terms & Condition</li>
          </ul>
        </div>

        <div className="cursor-pointer">
          <span className="font-bold text-gray-500">ACCOUNT</span>
          <ul>
            <li className="w-fit hover:text-red-500">Sign in</li>
            <li className="w-fit hover:text-red-500">Donor Dashboard</li>
            <li className="w-fit hover:text-red-500">Patient Dashboard</li>
          </ul>
        </div>
      </div>

      <div>
        <span>&copy; LIfeFlow Systems.</span>
      </div>
    </div>
  );
};

export default Footer;
