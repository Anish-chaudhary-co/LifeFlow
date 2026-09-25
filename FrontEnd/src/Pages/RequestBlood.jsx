import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import hospitals from "./hospitals";
import { UserContext } from "../Context/AuthContext";
import { SessionContext } from "../Context/protectedSession";

const RequestBlood = () => {
  const { setPatient } = useContext(UserContext);
  const { user, loading } = useContext(SessionContext);
  if (loading) {
    return <p>Checking login....</p>;
  }
  if (!user) {
    return <Navigate to="/signIn" replace />;
  }
  const initialState = {
    BloodType: "",
    period: "",
    patientName: "",
    unitNeeded: "",
    hospitalName: "",
    hospitalPhone: "",
    address: "",
    notes: "",
  };
  const [selectBlood, setSelectBlood] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patientData, setPatientData] = useState(initialState);
  // console.log(hospitals);

  const API_URL =
    "http://localhost/LifeFlow/Blood-Donation/BackEnd/include/requestBlood.php";

  const bloodGroup = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSelectBlood = (blood) => {
    setSelectBlood(blood);
    setPatientData((prev) => ({
      ...prev,
      BloodType: blood,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "unitNeeded" && Number(value) < 0) {
      alert("You cannot put negative value");
      return;
    }
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const requiredFields = [
      patientData.BloodType,
      patientData.period,
      patientData.patientName,
      patientData.unitNeeded,
      patientData.hospitalName,
      patientData.address,
    ];

    if (
      requiredFields.some(
        (field) => !field || (typeof field === "string" && field.trim() === ""),
      )
    ) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    if (Number(patientData.unitNeeded) <= 0) {
      alert("Units needed must be greater than 0.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...patientData,
        }),
      });
      setPatient(patientData);

      let result = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      console.log(result);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Request failed.");
      }

      alert("Emergency request submitted successfully.");
      setPatientData(initialState);
      setSelectBlood(null);
    } catch (error) {
      alert(error.message || "Something went wrong while saving the request.");
    } finally {
      setIsSubmitting(false);
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
                type="button"
                key={index}
                onClick={() => handleSelectBlood(bloods)}
                className={`border p-1 cursor-pointer text-center md:px-6 rounded-2xl ${selectBlood === bloods ? "text-white bg-rose-500" : "text-black bg-white"}`}
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
                name="patientName"
                value={patientData.patientName}
                onChange={handleChange}
                className="border block w-full h-10 p-2 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>
            <div>
              <label className="block">Units needed</label>
              <input
                type="number"
                name="unitNeeded"
                value={patientData.unitNeeded}
                onChange={handleChange}
                className="border block w-full h-10 p-2 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block">Hospital name</label>
              <select
                name="hospitalName"
                value={patientData.hospitalName}
                onChange={handleChange}
                className="border w-full h-10 block p-2 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 outline-none focus:ring-rose-400"
              >
                <option value="" className="bg-blue-900">
                  Select hospital
                </option>
                {hospitals.map((hospitals, index) => (
                  <option
                    key={index}
                    value={hospitals}
                    className="bg-slate-200 rounded-lg"
                  >
                    {hospitals}
                  </option>
                ))}
              </select>
              {/* <input
                type="text"
                name="hospitalName"
                value={patientData.hospitalName}
                onChange={handleChange}
                className="border block w-full h-10 p-2 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
              /> */}
            </div>
            <div>
              <label className="block">Hospital phone</label>
              <input
                type="number"
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
              name="notes"
              value={patientData.notes}
              onChange={handleChange}
              placeholder="Patient condition, special requirements....."
              className="border block w-full h-30 p-2 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 md:w-70 font-bold text-white p-3 rounded-lg text-center bg-rose-500 hover:bg-rose-700 disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Broadcast emergency request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestBlood;
