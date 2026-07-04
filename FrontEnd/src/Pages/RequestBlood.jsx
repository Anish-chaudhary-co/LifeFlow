import React, { useState, useEffect } from "react";

const RequestBlood = () => {
  const [selectBlood, setSelectBlood] = useState(null);

  const bloodGroup = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // useEffect(() => {
  //   if (selectBlood) {
  //     console.log(selectBlood);
  //   }
  // }, [selectBlood]);

  const [patientData, setPatientData] = useState({
    BloodType: "",
    period: "",
    name: "",
    unitNeeded: "",
    hospitalName: "",
    hospitalPhone: "",
    address: "",
    others: "",
  });

  const handleSelectBlood = (blood) => {
    setSelectBlood(blood);
    setPatientData((prev) => ({
      ...prev,
      BloodType: blood,
    }));
  };

  const handleChange = (e) => {
    setPatientData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (value) => {
    console.log(patientData);
    console.log(patientData.value);

    if (patientData.value === "") {
      alert("you have to fill the form first.");
    } else {
      alert("Nice !!!!");
    }
  };

  return (
    <div>
      <div className="bg-slate-100 border-slate-300 shadow-2xl border mt-20 m-2 md:m-30 rounded-xl p-4 md:p-8">
        <h1 className="text-3xl font-bold">Create an emergency request</h1>
        <p className="text-slate-500">
          Your request will be broadcast to verified donors matching blood
          group.
        </p>

        <div className="mt-12">
          <span>Blood group request</span>
          <div className="grid grid-cols-3 md:grid-cols-11 mt-1 gap-4">
            {bloodGroup.map((bloods, index) => (
              <button
                key={index}
                onClick={() => {
                  handleSelectBlood(bloods);
                }}
                className={`border p-1 cursor-pointer text-center md:px-6 rounded-2xl ${selectBlood == bloods ? "text-white bg-rose-500" : "text-black bg-white"}`}
              >
                {bloods}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="mt-5">
            <label className="block">Within time period</label>
            <input
              type="text"
              name="period"
              value={patientData.period}
              onChange={handleChange}
              className="border block w-full h-10 p-2 rounded-lg border-slate-300 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400 "
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block">Patient name</label>
              <input
                type="text"
                name="name"
                value={patientData.name}
                onChange={handleChange}
                className="border block w-full h-10 p-2 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>
            <div>
              <label className="block">Units needed</label>
              <input
                type="number"
                name="unitNeeded"
                value={patientData.units}
                onChange={handleChange}
                className="border block w-full h-10 p-2 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block">Hospital name</label>
              <input
                type="text"
                name="hospitalName"
                value={patientData.hospitalName}
                onChange={handleChange}
                className="border block w-full h-10 p-2 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>
            <div>
              <label className="block">Hospital phone</label>
              <input
                type="text"
                name="hospitalPhone"
                value={patientData.hospitalPhone}
                onChange={handleChange}
                className="border block w-full h-10 p-2 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>
          </div>
          <div>
            <span>Address</span>
            <input
              type="text"
              name="address"
              value={patientData.address}
              onChange={handleChange}
              className="border block w-full h-10 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>
          <div>
            <label>Notes for donors</label>
            <textarea
              name="others"
              value={patientData.others}
              onChange={handleChange}
              placeholder="Patient condition, special requirements....."
              className="border block w-full h-30 p-2 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-17">
            <button
              onClick={handleSubmit}
              className="px-4 font-bold text-white p-3 rounded-lg text-center bg-rose-500 hover:bg-rose-700"
            >
              Broadcast emergency request
            </button>
            <button className="px-4 border border-slate-200 hover:border-rose-500 font-bold  p-3 rounded-lg text-center ">
              Save as draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBlood;
