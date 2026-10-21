import { useContext } from "react";
import { profileContext } from "../../../Context/profileShowContext";
import {
  FaShieldAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaVenusMars,
  FaPhoneAlt,
} from "react-icons/fa";

const ProfileShow = () => {
  const { profile } = useContext(profileContext);

  return (
    <div className="md:mt-20 md:m-0 md:p-4">
      <div className="border p-2 md:p-8 rounded-lg border-slate-400">
        <div className="flex gap-4 md:gap-20">
          <img
            src="#"
            alt="Profile picture"
            className="w-15 h-15  md:w-40 md:h-40 border rounded-4xl"
          />
          <div>
            <div className="">
              <span className="font-bold text-sm md:text-xl text-rose-500">
                VERIFIED DONOR
              </span>
              <p className="font-bold text-xl md:text-5xl">
                {profile.FullName}
              </p>
              <span></span>
            </div>
          </div>
          <hr className="border-black" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 bg-amber-100 p-2 md:p-8 rounded-lg">
          <p className="flex flex-col gap-2">
            <span className="text-rose-500 font-semibold">Date of birth</span>
            <span className="flex gap-2 font-semibold">
              <FaCalendarAlt color="rose" />
              {profile.DateOfBirth}
            </span>
          </p>
          <p className="flex flex-col gap-2">
            <span className="text-rose-500 font-semibold">Gender</span>
            <span className="flex gap-2 font-semibold">
              <FaVenusMars color="rose" />
              {profile.Gender}
            </span>
          </p>
          <p className="flex flex-col gap-2">
            <span className="text-rose-500 font-semibold">Address</span>
            <span className="flex gap-2 font-semibold">
              <FaMapMarkerAlt color="rose" />
              {profile.Address}
            </span>
          </p>
          <p className="flex flex-col gap-2">
            <span className="text-rose-500 font-semibold">Contact</span>
            <span className="flex gap-2 font-semibold">
              <FaPhoneAlt color="rose" />
              {profile.Phone}
            </span>
          </p>
        </div>
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
