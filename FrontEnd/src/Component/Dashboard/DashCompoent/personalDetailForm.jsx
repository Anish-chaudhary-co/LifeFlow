import React, { useState } from "react";

const personalDetailForm = () => {
  const [gender, setGender] = useState("");
  return (
    <div className="border p-4 border-slate-200 rounded-2xl shadow-2xl">
      <form action="">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-semibold">Personal Detail:</h3>
          <span className="text-slate-400 font-sans">
            Your identifying information.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div>
            Full Name
            <input
              type="text"
              placeholder="Enter your full name"
              className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>
          <div>
            Date of birth
            <input
              type="date"
              className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>
          <div>
            <div className="flex gap-2 md:gap-5">
              Gender :
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
              <input
                type="radio"
                name="gender"
                value="others"
                checked={gender === "others"}
                onChange={(e) => setGender(e.target.value)}
              />
              Others
            </div>
          </div>
          <div>
            Address
            <input
              type="text"
              placeholder="Enter your full address"
              className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>
          <div>
            Blood Group
            <input
              type="text"
              placeholder="Enter your Blood group"
              className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>
          <div>
            Contact
            <input
              type="number"
              placeholder="Enter Contact"
              className="border py-2 w-full p-4 rounded-xl border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          <div>
            <input
              type="submit"
              className="px-4 py-2 rounded-lg bg-rose-400 hover:bg-rose-500 text-white font-bold"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default personalDetailForm;
