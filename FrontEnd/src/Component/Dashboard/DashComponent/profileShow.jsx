import { useContext } from "react";
import { profileContext } from "../../../Context/profileShowContext";
import {
  FaShieldAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaVenusMars,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";

const ProfileShow = () => {
  const { profile } = useContext(profileContext);
  const { FullName = "" } = profile || {};

  return (
    <div className=" md:m-0 md:p-2">
      <div className="flex gap-2 items-center md:gap-2">
        <div className="flex items-center justify-center w-15 h-15  md:w-35 md:h-35 rounded-4xl">
          <span className="py-4 px-4 border-slate-200 rounded-4xl bg-slate-200">
            {/* <img
            src="#"
            alt="Profile picture"
            className="w-15 h-15  md:w-40 md:h-40 border rounded-4xl"
          /> */}
            <FaUser className="md:text-5xl text:2xl" />
          </span>
        </div>
        <div>
          <div>
            <p className="flex gap-2 items-center px-2 rounded-lg bg-rose-500 text-xs text-white">
              <FaShieldAlt /> VERIFIED DONOR
            </p>
            <p className="font-bold text-xl md:text-5xl">{FullName}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 border border-slate-200 shadow-2xl p-2 md:p-8 rounded-lg">
        <p className="flex flex-col gap-2">
          <span className="text-rose-500 font-bold text-xl">Date of birth</span>
          <span className="flex gap-2 font-semibold">
            <FaCalendarAlt color="rose" />
            {profile.DateOfBirth}
          </span>
        </p>
        <p className="flex flex-col gap-2">
          <span className="text-rose-500 font-bold text-xl">Gender</span>
          <span className="flex gap-2 font-semibold">
            <FaVenusMars color="rose" />
            {profile.Gender}
          </span>
        </p>
        <p className="flex flex-col gap-2">
          <span className="text-rose-500 font-bold text-xl">Address</span>
          <span className="flex gap-2 font-semibold">
            <FaMapMarkerAlt color="rose" />
            {profile.Address}
          </span>
        </p>
        <p className="flex flex-col gap-2">
          <span className="text-rose-500 font-bold text-xl">Contact</span>
          <span className="flex gap-2 font-semibold">
            <FaPhoneAlt color="rose" />
            {profile.Phone}
          </span>
        </p>
      </div>

      <div className="flex gap-2 border border-slate-400 p-4 mt-10 rounded-lg  ">
        <div>
          <FaShieldAlt size={40} color="green" />
        </div>
        <div>
          <h4 className="font-semibold text-green-500 text-sm">
            PROFILE STATUS
          </h4>
          <p>You're ready to make an impact</p>
          <span className="text-slate-700">
            We'll use your details to show relevant donation opportunities and
            appointments.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileShow;
