import { useState } from "react";
const Overview = () => {
  const date = new Date();
  console.log(date);
  const day = date.getDate();
  const month = date.getMonth("long");
  const year = date.getFullYear();

  console.log(day + ":" + month + ":" + year);
  const [name, setName] = useState("Anish");

  return (
    <div className="mt-20 md:m-4">
      <div className="text-xl">
        {day}/{month}/{year}
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-4xl">Hello,{name}.</span>
        <span className="text-slate-400">
          Your small act can make a lasting difference.
        </span>
      </div>

      <div className="flex flex-col gap-2 border border-green-500 rounded-xl p-3 mt-4 w-full bg-green-200">
        <span className="text-bold">You're eligible to donate</span>
        <span>Your next donation window opens in 12 days.</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-23 md:grid-cols-3 justify-between w-full mt-4">
        <div className="border border-black p-4 rounded-lg h-60 w-80 ">
          Total donation
        </div>
        <div className="border border-black p-4 rounded-lg h-60 w-80 ">
          Total donation
        </div>
        <div className="border border-black p-4 rounded-lg h-60 w-80 ">
          Total donation
        </div>
      </div>
    </div>
  );
};

export default Overview;
