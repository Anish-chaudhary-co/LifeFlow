import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";

const EditBloodHistory = ({ onClose }) => {
  const [data, setData] = useState(null);

  const [update, setUpdate] = useState({
    patientName: "",
    BloodType: "",
    hospitalName: "",
    hospitalPhone: "",
    unitNeeded: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    fetch(
      "http://localhost/LifeFlow/Blood-Donation/BackEnd/dashboard/onEdit.php",
      {
        credentials: "include",
      },
    )
      .then(async (res) => {
        const response = await res.json();

        if (!res.ok) {
          throw new Error(response.message || "Unable to load request data.");
        }

        return response;
      })
      .then((response) => {
        const result = response.requests?.[0] || null;
        setData(result);
        console.log("Edit request:", result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //update

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/Update.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-3xl border border-slate-300 shadow-2xl bg-white rounded-lg">
          <div className="flex items-center justify-between border-b p-4 ">
            <h2 className="text-xl font-bold">Edit blood request</h2>
            <button type="button" onClick={onClose}>
              <MdCancel size={35} color="red" />
            </button>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center p-4 m-4">
              <div className="flex flex-col gap-4 m-4">
                Patient Name
                <input
                  type="text"
                  className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                  value={data?.patientName || ""}
                  name="patientName"
                  onChange={handleUpdate}
                />
              </div>
              <div className="flex flex-col gap-4 m-4">
                Blood Type
                <input
                  type="text"
                  className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                  value={data?.BloodType || ""}
                  name="BloodType"
                  onChange={handleUpdate}
                />
              </div>
              <div className="flex flex-col gap-4 m-4">
                Hospital Name
                <input
                  type="text"
                  className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                  value={data?.hospitalName || ""}
                  name="hospitalName"
                  onChange={handleUpdate}
                />
              </div>
              <div className="flex flex-col gap-4 m-4">
                Hospital Phone
                <input
                  type="number"
                  className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                  value={data?.hospitalPhone || ""}
                  name="hospitalPhone"
                  onChange={handleUpdate}
                />
              </div>
              <div className="flex flex-col gap-4 m-4">
                Units
                <input
                  type="number"
                  className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                  value={data?.unitNeeded || ""}
                  name="unitNeeded"
                  onChange={handleUpdate}
                />
              </div>
              <div className="flex flex-col gap-4 m-4">
                Address
                <input
                  type="text"
                  className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                  value={data?.address || ""}
                  name="address"
                  onChange={handleUpdate}
                />
              </div>
              <div className="flex flex-col gap-4 m-4">
                Notes:
                <textarea
                  name="notes"
                  id=""
                  className="border border-slate-500 rounded-lg p-2 focus:ring-2 focus:border-rose-400 focus:ring-rose-400 outline-none"
                  value={data?.notes || ""}
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
                className="border px-4 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-800"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBloodHistory;
