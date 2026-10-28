import React, { useState } from "react";
import {
  FaTint,
  FaHospital,
  FaPhone,
  FaMapMarkerAlt,
  FaGenderless,
  FaTimes,
} from "react-icons/fa";

const patientRequestShow = ({ selectRequest, sendRequest, setSendRequest }) => {
  const [RequestData, setRequestData] = useState([]);

  const handleResponseMessage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleResponse = async () => {
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/api/patientResponse.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            body: JSON.stringify(RequestData),
          },
        },
      );
      const result = await response.json();
      if (!response.ok || result.success) {
        throw new Error("Cannot response to this post.");
      }
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const click = (e) => {
    e.preventDefault();
    setRequestData(selectRequest);
    setSendRequest(!sendRequest);
    console.log(RequestData);
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-black/80">
      <div className="p-4 w-98 md:w-[500px] bg-white shadow-2xl border rounded-2xl m-2 ">
        <form action="" className="relative">
          <div className="flex gap-4 md:gap-18">
            <span className="flex  items-center px-2 h-10 rounded-3xl bg-rose-500 text-white font-semibold">
              {selectRequest.BloodType}
            </span>
            <span>
              <h1 className="font-bold text-2xl">
                {selectRequest.patientName}
              </h1>

              <p className="flex gap-2 text-red-500">
                <FaTint color="red" />
                {selectRequest.unitNeeded}
                <strong>Unit Needed</strong>
              </p>
              <div className="flex gap-2 font-black">
                <FaHospital />
                <p>{selectRequest.hospitalName}</p>
              </div>
              <div className="flex gap-2 font-black">
                <FaPhone />
                <p>{selectRequest.hospitalPhone}</p>
              </div>
              <div className="flex gap-2 font-black">
                <FaMapMarkerAlt />
                <p>{selectRequest.address}</p>
              </div>
              <div className="flex gap-2 font-black">
                <FaGenderless />
                <p>{selectRequest.gender}</p>
              </div>
            </span>
          </div>

          <p className="text-green-400">
            <strong>Request on : </strong>
            {selectRequest.created_date}
          </p>
          <p>
            <strong className="text-rose-500">
              Needed blood in {selectRequest.period}.
            </strong>
          </p>

          <div className="grid grid-cols-1 gap-2 mt-8">
            <textarea
              name="responseMsg"
              value={RequestData.responseMsg}
              onChange={handleResponseMessage}
              placeholder="Please give a message to patient......"
              className="border p-2 rounded-lg "
            ></textarea>
            <div className="flex gap-4">
              <button
                onClick={click}
                className="px-3 h-10 w-25 bg-rose-500 rounded-lg font-bold text-white hover:bg-rose-300"
              >
                Response
              </button>
              <button
                onClick={() => setSendRequest(!sendRequest)}
                className="border px-3 h-10 w-25 bg-white  rounded-lg font-bold hover:bg-rose-300"
              >
                Cancel
              </button>
            </div>
          </div>
          <button
            onClick={() => setSendRequest(!sendRequest)}
            className="absolute top-2 right-2 hover:rose-500"
          >
            <FaTimes />
          </button>
        </form>
      </div>
    </div>
  );
};

export default patientRequestShow;
