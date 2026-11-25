import { useState, useEffect } from "react";
import EditBloodHistory from "./editBloodHistory";
import ViewResponse from "../viewResponse";

import {
  FaPhone,
  FaHospital,
  FaUser,
  FaBox,
  FaTrash,
  FaEye,
  FaPen,
  FaStickyNote,
  FaMap,
} from "react-icons/fa";

const RequestHistory = () => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showResponseDetail, setShowResponseDetail] = useState(false);

  const fetchRequests = () => {
    fetch(
      "http://localhost/LifeFlow/Blood-Donation/BackEnd/dashboard/requestHistory.php",
      {
        method: "GET",
        credentials: "include",
      },
    )
      .then(async (response) => {
        const request = await response.json();
        if (!response.ok) {
          throw new Error(request.message || "Unable to load request history.");
        }
        return request;
      })
      .then((request) => {
        if (request.success) {
          setData(request.requests);
        } else {
          throw new Error(request.message || "Unable to load request history.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleEditClick = (request) => {
    setSelectedData(request);
    setEdit(true);
  };

  const handleUpdateRequest = (updatedRequest) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === updatedRequest.id ? updatedRequest : item,
      ),
    );
    setEdit(false);
  };

  const handleDelete = async (request) => {
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/dashboard/deleteHistory.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestId: request.id,
          }),
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Blood request deleted successfully");
        setData((prev) => prev.filter((item) => item.id !== requestId));
      } else {
        throw new Error(result.message || "Unable to delete blood request.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to delete blood request.");
    }
  };

  const handleResponse = (request) => {
    setSelectedData(request);
    setShowResponseDetail(true);
  };

  return (
    <>
      {" "}
      <div>
        {edit && (
          <EditBloodHistory
            onClose={() => setEdit(false)}
            onSave={handleUpdateRequest}
            selectedData={selectedData}
          />
        )}
        <h1 className="text-2xl font-bold">Blood request history</h1>
        <div className="flex flex-col md:gap-10 mt-4">
          {data.map((request, index) => (
            <div
              key={index}
              className="border rounded-4xl p-6 bg-white border-slate-200 shadow-2xl"
            >
              <div className="flex gap-4">
                <span className="px-3 py-3 rounded-4xl font-bold bg-rose-500 text-white">
                  {request.BloodType}
                </span>
                <h1 className="font-semibold text-2xl">
                  {request.patientName}
                </h1>
              </div>
              <div className="flex md:flex-row flex-col gap-4 md:gap-40">
                <div className="ml-15 md:ml-18 text-slate-600">
                  <p className="flex gap-2 items-center">
                    <FaBox />
                    <p>{request.unitNeeded} unit needed</p>
                  </p>
                  <p className="flex gap-2 items-center">
                    <FaHospital />
                    {request.hospitalName}
                  </p>
                  <p className="flex gap-2 items-center">
                    <FaPhone />
                    {request.hospitalPhone}
                  </p>

                  <p p className="flex gap-2 items-center">
                    <FaUser /> Personal address:
                    {request.address}
                  </p>
                </div>
                <div>
                  <p className="flex gap-2 items-center">
                    <FaStickyNote />
                    Notes:
                  </p>
                  <div className="rounded-2xl bg-rose-300 p-3 h-min">
                    <p className="line-clamp-5 break-all">{request.notes}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="flex gap-2 items-center border rounded-lg bg-green-500 text-white font-bold h-10 px-4"
                    onClick={() => handleEditClick(request)}
                  >
                    <FaPen />
                    Edit
                  </button>
                  <button
                    type="button"
                    className=" flex gap-2 items-center border rounded-lg bg-red-500 text-white font-bold h-10 px-4"
                    onClick={() => handleDelete(request)}
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
              <button
                className="flex gap-2 items-center bg-rose-200 mt-10 py-2 px-4 text-sm text-red-500 rounded-2xl"
                onClick={() => handleResponse(request)}
              >
                <FaEye color="red" />
                View response
              </button>
            </div>
          ))}
          {showResponseDetail && (
            <ViewResponse
              setShowResponseDetail={setShowResponseDetail}
              request={selectedData}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RequestHistory;
