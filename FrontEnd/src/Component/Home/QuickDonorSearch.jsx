import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const QuickDonorSearch = () => {
  const BloodGroup = ["All", "A+", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const [bloodSelect, setBloodSelect] = useState(null);
  const handleBloodGroupClick = (group) => {
    setBloodSelect(group);
    console.log(group);
  };
  return (
    <div className="flex justify-center items-center">
      {/* for search  */}
      <div className="border border-gray-300 p-4 bg-slate-200 w-6xl mt-8 rounded-4xl text-center shadow-xl">
        <h1 className="font-bold text-2xl">Quick donor search</h1>
        <div className="mt-8">
          <span className="text-gray-400">Blood group</span>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 mt-4">
            {BloodGroup.map((items, index) => (
              <button
                key={index}
                onClick={() => {
                  handleBloodGroupClick(items);
                }}
                className={`border border-gray-300 rounded-xl ${bloodSelect === items ? "text-white bg-rose-500" : "text-black bg-white"}`}
              >
                {items}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center m-8">
          <div className="flex flex-col">
            <span className="text-gray-400">Location</span>
            <input
              type="search"
              className="border bg-gray-400 p-2 pl-4 mt-6 w-70 md:w-4xl rounded-4xl"
              placeholder="📍 Location"
            />
          </div>

          <div className="mt-6">
            <NavLink
              to="findDonor"
              className="p-2 rounded-2xl bg-black hover:bg-gray-900 text-white text-center font-bold px-20 md:w-97 border"
            >
              Search Donor
            </NavLink>
          </div>
        </div>
      </div>

      {/* for showing number of user  */}
    </div>
  );
};

export default QuickDonorSearch;
