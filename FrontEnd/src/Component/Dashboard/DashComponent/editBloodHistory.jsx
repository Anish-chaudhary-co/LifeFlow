import React from "react";

const EditBloodHistory = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl border border-black bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold">Edit blood request</h2>
          <button type="button" onClick={onClose} aria-label="Close edit form">
            Close
          </button>
        </div>
        <form action="">
          <div className="grid md:grid-cols-2 grid-cols-1 justify-center items-center p-4 m-4">
            <div className="flex flex-col gap-4 m-4">
              Name
              <input type="text" className="border p-2" />
            </div>
            <div className="flex flex-col gap-4 m-4">
              Blood Type
              <input type="text" className="border p-2" />
            </div>
            <div className="flex flex-col gap-4 m-4">
              Units
              <input type="text" className="border p-2" />
            </div>
            <div className="flex flex-col gap-4 m-4">
              Hospital Name
              <input type="text" className="border p-2" />
            </div>
            <div className="flex flex-col gap-4 m-4">
              Address
              <input type="text" className="border p-2" />
            </div>
            <div className="flex flex-col gap-4 m-4">Notes:</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBloodHistory;
