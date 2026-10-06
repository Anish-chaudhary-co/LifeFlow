import { useState, useEffect } from "react";
import EditBloodHistory from "./editBloodHistory";

const RequestHistory = () => {
  const [edit, setEdit] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setEdit((isEditing) => !isEditing);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
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
  }, []);

  return (
    <div className="mt-20">
      {edit && <EditBloodHistory onClose={() => setEdit(false)} />}
      <h1 className="text-2xl font-bold">Blood request history</h1>
      <table className="border mt-4 w-full border-collapse">
        <thead>
          <tr className="border">
            <th className="border-r p-3">S.N</th>
            <th className="border-r p-3">Name</th>
            <th className="border-r p-3">Blood Type</th>
            <th className="border-r p-3">Units</th>
            <th className="border-r p-3">Hospital Name</th>
            <th className="border-r p-3">Hospital Phone</th>
            <th className="border-r p-3">Address</th>
            <th className="border-r p-3">Notes</th>
            <th className="border-r p-3">Action</th>
          </tr>
        </thead>
        <tbody className="border-b">
          {data.length > 0 ? (
            data.map((request, index) => (
              <tr key={`${request.patientName}-${index}`} className="border-b">
                <td className="border-r p-3">{index + 1}</td>
                <td className="border-r p-3">{request.patientName}</td>
                <td className="border-r p-3">{request.BloodType}</td>
                <td className="border-r p-3">{request.unitNeeded}</td>
                <td className="border-r p-3">{request.hospitalName}</td>
                <td className="border-r p-3">{request.hospitalPhone}</td>
                <td className="border-r p-3">{request.address}</td>
                <td className="border-r p-3">
                  <p className="line-clamp-2 break-all">{request.notes}</p>
                </td>
                <td className="flex gap-3 justify-center p-3">
                  <button
                    type="button"
                    className="border rounded-lg bg-green-400 text-white font-bold px-4"
                    onClick={handleClick}
                  >
                    Edit
                  </button>
                  <button className="border rounded-lg bg-red-400 text-white font-bold px-4">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-3 text-center" colSpan="9">
                No blood requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestHistory;
