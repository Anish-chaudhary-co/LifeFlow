import React from "react";
import { FaSearchLocation } from "react-icons/fa";

const QuickDonorSearch = () => {
  const BloodGroup = ["All", "A+", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  return (
    <div className="flex justify-center items-center border-gray-300 p-4 bg-gray-200">
      {/* for search  */}
      <div className="border border-gray-100 p-4 bg-white rounded-xl text-center shadow-xl">
        <h1 className="font-bold text-2xl">Quick donor search</h1>
        <div className="mt-8">
          <span className="text-gray-400">Blood group</span>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 mt-4">
            {BloodGroup.map((items, index) => (
              <button key={index} className="border border-gray-300 rounded-xl">
                {items}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center mt-8">
          <div className="flex flex-col">
          <span className="text-gray-400">Location</span>
          <input
            type="search"
            className="border-gray-300 p-2 w-auto md:w-97 rounded-2xl bg-gray-400 mt-2"
            placeholder="📍 Location"
          />
          </div>
        
        <div>
        <input
          type="submit"
          value="Search donors"
          className="p-2 mt-4 rounded-2xl bg-black hover:bg-gray-900 text-white text-center font-bold px-20 md:w-97 border"
        />
        </div>
      </div>
      </div>

      {/* for showing number of user  */}
      
    </div>
  
  );
};

export default QuickDonorSearch;
