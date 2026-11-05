import React from "react";
import showBg from "../../assets/showBg.png";
import {
  FaTimes,
  FaUser,
  FaVenusMars,
  FaCalendarAlt,
  FaTint,
  FaPhone,
  FaMapMarkedAlt,
} from "react-icons/fa";

const findDonorDetail = ({ setOpenDonor, donor }) => {
  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black/50">
      <div
        className="border h-79 w-full md:w-[600px] p-6 m-4 rounded-lg bg-cover md:bg-center z-40 relative"
        style={{ backgroundImage: `url(${showBg})` }}
      >
        <FaTimes
          color="red"
          className="absolute top-2 right-2"
          onClick={() => setOpenDonor(false)}
        />
        <div className="flex gap-2">
          <span className="w-1 rounded-lg bg-red-500"></span>
          <strong className="flex text-xl font-bold">
            Donor <p className="text-red-400">Details</p>
          </strong>
        </div>
        <hr className="mt-2 text-red-500" />
        <div className="flex flex-col gap-2 mt-2">
          <p className="flex gap-2 font-semibold">
            <FaUser color="red" />
            <strong>Name: </strong>
            {donor.FullName}
          </p>
          <p className="flex gap-2 font-semibold">
            <FaVenusMars color="red" />
            <strong>Gender: </strong>
            {donor.Gender}
          </p>
          <p className="flex gap-2 font-semibold">
            <FaCalendarAlt color="red" />
            <strong>DOB: </strong>
            {donor.DateOfBirth}
          </p>
          <p className="flex gap-2 font-semibold">
            <FaTint color="red" />
            <strong>Blood Group: </strong>
            {donor.BloodGroup}
          </p>
          <p className="flex gap-2 font-semibold">
            <FaPhone color="red" />
            <strong>Phone: </strong>
            {donor.Phone}
          </p>
          <p className="flex gap-2 font-semibold">
            <FaMapMarkedAlt color="red" />
            <strong>Address: </strong>
            {donor.Address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default findDonorDetail;
