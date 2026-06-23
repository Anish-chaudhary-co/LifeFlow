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
            <div>
              <FaTwitter />
            </div>
            <div>
              <FaFacebook />
            </div>
            <div>
              <FaInstagram />
            </div>
            <div>
              <FaGoogle />
            </div>
          </div>
        </div>

        <div>
          <span className="font-bold text-gray-500">PLATFORM</span>
          <ul>
            <li>Find Donor</li>
            <li>Request Blood</li>
            <li>Blood Banks</li>
          </ul>
        </div>

        <div>
          <span className="font-bold text-gray-500">COMPANY</span>
          <ul>
            <li>Admin</li>
            <li>Privacy</li>
            <li>Terms & Condition</li>
          </ul>
        </div>

        <div>
          <span className="font-bold text-gray-500">ACCOUNT</span>
          <ul>
            <li>Sign in</li>
            <li>Donor Dashboard</li>
            <li>Patient Dashboard</li>
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
