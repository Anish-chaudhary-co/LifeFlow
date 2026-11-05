import { useContext, useReducer, useState } from "react";
import BackGround from "../assets/background.png";
import BloodRequest from "../assets/bloodRequest.png";
import hospitals from "./hospitals";
import { UserContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaTint,
  FaCalendarAlt,
  FaHospital,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
  FaUser,
  FaStickyNote,
  FaPaperPlane,
} from "react-icons/fa";

const RequestBlood = () => {
  const navigate = useNavigate();
  const { setPatient } = useContext(UserContext);
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
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...patientData,
        }),
      });
      let result = await response.json();
      console.log(result);
      console.log(patientData);

      if (result.loggedIn === false) {
        navigate("/signIn", { replace: true });
        return;
      }
      setPatient(patientData);

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
    <div
      className="pt-20 md:p-30 bg-cover bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      <div
        className="bg-rose-100 border-rose-300 shadow-rose-200 shadow-xl font-semibold border m-2 rounded-xl p-4 md:p-8 min-h-screen  bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BloodRequest})` }}
      >
        <div className="flex gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Create an <span className="text-red-500">emergency</span> request
            </h1>
            <p className="text-slate-500">
              Your request will be broadcast to verified donors matching blood
              group.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <span className="flex gap-2 items-center">
            <FaTint color="red" />
            Blood group request
          </span>
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
          <div className="mt-5 ">
            <label className="flex gap-3 items-center">
              <FaCalendarAlt color="red" />
              Required date:
            </label>
            <input
              type="date"
              name="period"
              value={patientData.period}
              onChange={handleChange}
              className="border block w-full h-10 p-2 rounded-lg border-slate-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400 "
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex gap-2 items-center">
                <FaUser color="red" />
                Patient name
              </label>
              <input
                type="text"
                name="patientName"
                placeholder="Enter patient name.."
                value={patientData.patientName}
                onChange={handleChange}
                className="border block w-full h-10 p-2 rounded-lg border-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>
            <div>
              <label className="flex gap-2 items-center">
                <FaTint color="red" />
                Units needed
              </label>
              <input
                type="number"
                name="unitNeeded"
                placeholder="e.g.2,3,4..."
                value={patientData.unitNeeded}
                onChange={handleChange}
                className="border block w-full h-10 p-2 rounded-lg border-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex gap-2 items-center">
                <FaHospital color="red" />
                Hospital name
              </label>
              <select
                name="hospitalName"
                value={patientData.hospitalName}
                onChange={handleChange}
                className="border w-full h-10 block p-2 rounded-lg border-slate-400 focus:border-rose-400 focus:ring-2 outline-none focus:ring-rose-400"
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
                className="border block w-full h-10 p-2 rounded-lg border-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
              /> */}
            </div>
            <div>
              <label className="flex gap-2 items-center">
                <FaPhone color="red" />
                Hospital phone
              </label>
              <input
                type="number"
                name="hospitalPhone"
                placeholder="Enter hospital phone.."
                value={patientData.hospitalPhone}
                onChange={handleChange}
                className="border block w-full h-10 p-2 rounded-lg border-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
              />
            </div>
          </div>

          <div>
            <span className="flex gap-2 items-center">
              <FaMapMarkerAlt color="red" />
              Address
            </span>
            <input
              type="text"
              name="address"
              placeholder="Enter full address.."
              value={patientData.address}
              onChange={handleChange}
              className="border block w-full h-10 p-2 rounded-lg border-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          <div>
            <label className="flex gap-2 items-center">
              <FaStickyNote color="red" />
              Notes for donors
            </label>
            <textarea
              name="notes"
              value={patientData.notes}
              onChange={handleChange}
              placeholder="Add any additional notes (e.g. special requirement etc).."
              className="border block w-full h-30 p-2 rounded-lg border-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex gap-2 items-center px-4 md:w-70 font-bold text-white p-3 rounded-lg text-center bg-rose-500 hover:bg-rose-700 disabled:opacity-60"
          >
            <FaPaperPlane />
            {isSubmitting ? "Saving..." : "Broadcast emergency request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestBlood;
