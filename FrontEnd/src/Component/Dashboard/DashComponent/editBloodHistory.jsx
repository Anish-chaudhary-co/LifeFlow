import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import Hospitals from "../../../Pages/hospitals";
import hospitals from "../../../Pages/hospitals";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const EditBloodHistory = ({ selectedData, onClose, onSave }) => {
  const [update, setUpdate] = useState({
    id: selectedData?.id || "",
    patientName: selectedData?.patientName || "",
    BloodType: selectedData?.BloodType || "",
    period: selectedData?.period || "",
    hospitalName: selectedData?.hospitalName || "",
    hospitalPhone: selectedData?.hospitalPhone || "",
    unitNeeded: selectedData?.unitNeeded || "",
    address: selectedData?.address || "",
    notes: selectedData?.notes || "",
  });

  useEffect(() => {
    setUpdate({
      id: selectedData?.id || "",
      patientName: selectedData?.patientName || "",
      BloodType: selectedData?.BloodType || "",
      period: selectedData?.period || "",
      hospitalName: selectedData?.hospitalName || "",
      hospitalPhone: selectedData?.hospitalPhone || "",
      unitNeeded: selectedData?.unitNeeded || "",
      address: selectedData?.address || "",
      notes: selectedData?.notes || "",
    });
  }, [selectedData]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!update.id) {
      alert("No request selected to update.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/dashboard/updateHistory.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update),
        },
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to update blood request.");
      }

      if (onSave) {
        onSave(result.updatedRequest || update);
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to update blood request.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-3xl border border-slate-300 shadow-2xl bg-white rounded-lg">
        <div className="flex items-center justify-between border-b p-4 ">
          <h2 className="text-xl font-bold">Edit blood request</h2>
          <button type="button" onClick={onClose}>
            <MdCancel size={35} color="red" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center p-4 m-4">
            <div className="flex flex-col gap-4 m-4">
              Patient Name
              <input
                type="text"
                className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                value={update.patientName}
                name="patientName"
                onChange={handleUpdate}
              />
            </div>
            <div className="flex flex-col gap-4 m-4">
              Blood Type
              <select
                name="BloodType"
                value={update.BloodType}
                onChange={handleUpdate}
                className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
              >
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-4 m-4">
              Within time period
              <input
                type="text"
                className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                value={update.period}
                name="period"
                onChange={handleUpdate}
              />
            </div>
            <div className="flex flex-col gap-4 m-4">
              Hospital Name
              <select
                name="hospitalName"
                value={update.hospitalName}
                onChange={handleUpdate}
                className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
              >
                {Hospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-4 m-4">
              Hospital Phone
              <input
                type="number"
                className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                value={update.hospitalPhone}
                name="hospitalPhone"
                onChange={handleUpdate}
              />
            </div>
            <div className="flex flex-col gap-4 m-4">
              Units
              <input
                type="number"
                className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                value={update.unitNeeded}
                name="unitNeeded"
                onChange={handleUpdate}
              />
            </div>
            <div className="flex flex-col gap-4 m-4 md:col-span-2">
              Address
              <input
                type="text"
                className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                value={update.address}
                name="address"
                onChange={handleUpdate}
              />
            </div>
            <div className="flex flex-col gap-4 m-4 md:col-span-2">
              Notes:
              <textarea
                name="notes"
                className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                value={update.notes}
                onChange={handleUpdate}
              />
            </div>
          </div>
          <div className="flex gap-8 relative bottom-8 left-15">
            <button
              type="submit"
              className="border px-4 py-2 rounded-lg bg-rose-400 text-white font-bold hover:bg-rose-500"
            >
              Update
            </button>
            <button
              type="button"
              className="border px-4 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-800"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBloodHistory;
