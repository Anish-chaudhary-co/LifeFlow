import React, { useState } from "react";

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
      <div className="p-4 w-98 md:w-[500px] bg-white shadow-2xl border rounded-2xl m-2">
        <form action="">
          <div className="flex gap-4 md:gap-18">
            <span className="flex  items-center px-2 h-10 rounded-3xl border">
              {selectRequest.BloodType}
            </span>
            <span>
              <h1>{selectRequest.patientName}</h1>

              <p>
                {selectRequest.unitNeeded}
                <strong>Unit Needed</strong>
              </p>
              <p>{selectRequest.hospitalName}</p>
              <p>{selectRequest.hospitalPhone}</p>
              <p>{selectRequest.address}</p>
              <p>{selectRequest.gender}</p>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <textarea
              name="responseMsg"
              value={RequestData.responseMsg}
              onChange={handleResponseMessage}
              placeholder="Please give a message to patient......"
              className="border p-2 rounded-lg "
            ></textarea>

            <button
              onClick={click}
              className="px-3 py-4 bg-rose-500 rounded-lg font-bold text-white hover:bg-rose-300"
            >
              Response
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default patientRequestShow;
