import React from "react";
import { FaUserPlus, FaSearch, FaHandHoldingHeart } from "react-icons/fa";
const howToUse = () => {
  return (
    <>
      <div className="flex flex-col gap-4 p-2 mt-8 border border-slate-200 font-semibold">
        <span className="font-bold text-sm text-rose-500 md:ml-24">
          HOW IT WORKS
        </span>
        <div className="md:ml-24">
          <h1 className="font-bold text-2xl">The path to saving a life.</h1>
          <p className="text-gray-400">
            Three simple steps connect critical needs with wiling donors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-2 md:ml-24">
          <div className="p-4 h-50 md:w-97 rounded-2xl shadow-2xl shadow-rose-200">
            <span className="px-2 py-2 rounded-2xl bg-rose-200 text-rose-500 font-bold">
              01
            </span>
            <div className="flex flex-col items-center justify-center">
              <FaUserPlus size={40} color="red" />
              <h4 className="font-bold text-lg">Register & verify</h4>
              <p className="text-center text-sm">
                Complete your donor profile with blood group and medical
                history. Verified in under five minutes.
              </p>
            </div>
          </div>
          <div className="p-4 h-50 md:w-97 rounded-2xl shadow-2xl shadow-rose-200">
            <span className="px-2 py-2 rounded-2xl bg-rose-200 text-rose-500 font-bold">
              02
            </span>
            <div className="flex flex-col items-center justify-center">
              <FaSearch size={40} color="red" />
              <h4 className="font-bold text-lg">Get matched instantly</h4>
              <p className="text-center text-sm">
                Receive alerts when your blood type is needed nearby, or search
                for active emergency requests.
              </p>
            </div>
          </div>
          <div className="p-4 h-50 md:w-97 rounded-2xl shadow-2xl shadow-rose-200">
            <span className="px-2 py-2 rounded-2xl bg-rose-200 text-rose-500 font-bold">
              03
            </span>
            <div className="flex flex-col items-center justify-center">
              <FaHandHoldingHeart size={40} color="red" />
              <h4 className="font-bold text-lg">Donate & save</h4>
              <p className="text-center text-sm">
                Visit the verified blood bank, donate safely, and track every
                life you've helped save.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
};

export default howToUse;
