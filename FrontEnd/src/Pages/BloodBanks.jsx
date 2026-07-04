import React from "react";

const BloodBanks = () => {
  return (
    <div className="mt-20 m-2 md:m-30">
      <div>
        <h1 className="font-bold text-3xl">Blood bank directory</h1>
        <span className="text-slate-400 mt-2">
          certified blood banks with live stock data.
        </span>
      </div>

      <input
        type="text"
        placeholder="Search by blood type and address..."
        className="p-2 border border-slate-200 bg-slate-300 mt-8 w-full rounded-2xl focus:bg-white focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none"
      />

      <div></div>
    </div>
  );
};

export default BloodBanks;
