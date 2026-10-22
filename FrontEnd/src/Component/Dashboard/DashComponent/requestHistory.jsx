import { useState, useEffect } from "react";
import EditBloodHistory from "./editBloodHistory";

const RequestHistory = () => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const fetchRequests = () => {
    fetch(
      "http://localhost/LifeFlow/Blood-Donation/BackEnd/dashboard/requestHistory.php",
      { credentials: "include" },
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/dashboard/deleteHistory.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        alert("Blood request deleted successfully");
        setData((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20">
      {edit && (
        <EditBloodHistory
          onClose={() => setEdit(false)}
          onSave={handleUpdateRequest}
          selectedData={selectedData}
        />
      )}
      <h1 className="text-2xl font-bold">Blood request history</h1>
      <div className="flex flex-col gap-10 mt-4">
        {data.map((request, index) => (
          <div className="border rounded-4xl p-6 bg-white border-slate-200 shadow-2xl">
            <div className="flex gap-4">
              <span className="px-3 py-3 rounded-4xl font-bold bg-rose-500 text-white">
                {request.BloodType}
              </span>
              <h1 className="font-semibold text-2xl">{request.patientName}</h1>
            </div>
            <div className="flex md:flex-row flex-col justify-between gap-40">
              <div className="mt-2 text-slate-600">
                <p>
                  {request.unitNeeded}
                  <strong className="pl-2">unit needed</strong>
                </p>
                <p>{request.hospitalName}</p>
                <p>{request.hospitalPhone}</p>
                <p>
                  <strong>Personal address:</strong>
                  {request.address}
                </p>
              </div>
              <div>
                <strong>Notes:</strong>
                <div className="border border-slate-500 rounded-2xl bg-rose-400 text-white p-3 h-min">
                  <p className="line-clamp-5 break-all">{request.notes}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="border rounded-lg bg-green-400 text-white font-bold h-10 px-4"
                  onClick={() => handleEditClick(request)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="border rounded-lg bg-red-400 text-white font-bold h-10 px-4"
                  onClick={() => handleDelete(request.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestHistory;
