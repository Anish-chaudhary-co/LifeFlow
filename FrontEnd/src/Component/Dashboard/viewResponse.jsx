import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const RequestResponse = ({ setShowResponseDetail, request }) => {
  const [gettingResponse, setGettingResponse] = useState(false);
  const [responseDetail, setResponseDetail] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let isMounted = true;
    const handleResponseData = async () => {
      setGettingResponse(true);
      setFeedback("");
      try {
        const response = await fetch(
          "http://localhost/LifeFlow/Blood-Donation/BackEnd/api/getUserDetail.php",
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
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to get response.");
        }
        if (isMounted) {
          setResponseDetail(result.donorDetail);
          console.log(result);
        }
      } catch (error) {
        if (isMounted) {
          setFeedback(error.message || "Unable to get response.");
        }
      } finally {
        if (isMounted) {
          setGettingResponse(false);
        }
      }
    };
    handleResponseData();
    return () => {
      isMounted = false;
    };
  }, [request.id]);

  const handleAccept = async (request_id) => {
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/api/requestAccepted.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: request_id,
          }),
        },
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  const handleReject = async (request_id) => {
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/api/requestRejected.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: request_id,
          }),
        },
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-black/70">
      <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto p-6 rounded-lg relative bg-slate-300 shadow-2xl">
        <FaTimes
          className="absolute top-3 right-3 cursor-pointer"
          onClick={() => setShowResponseDetail(false)}
        />
        <h2 className="mb-4 text-xl font-bold">Donor responses</h2>
        {gettingResponse && <p>Loading responses...</p>}
        {!gettingResponse && feedback && (
          <p role="alert" className="text-rose-600">
            {feedback}
          </p>
        )}
        {!gettingResponse &&
          !feedback &&
          responseDetail.map((donor) => (
            <div
              key={donor.id}
              className="bg-white mb-4 rounded-lg shadow-2xl p-4 relative"
            >
              <p>
                <strong>Name:</strong> {donor.FullName}
              </p>
              <p>
                <strong>Gender:</strong> {donor.Gender}
              </p>
              <p>
                <strong>Date of birth:</strong> {donor.DateOfBirth}
              </p>
              <p>
                <strong>Blood group:</strong> {donor.BloodGroup}
              </p>
              <p>
                <strong>Phone:</strong> {donor.Phone}
              </p>
              <p>
                <strong>Address:</strong> {donor.Address}
                <strong>Address:</strong> {donor.request_id}
              </p>
              <p>
                <strong>Message:</strong> {donor.message}
              </p>
              <div className="flex gap-4 absolute right-4 bottom-4">
                <button
                  onClick={() => handleAccept(donor.request_id)}
                  className="py-2 px-8 bg-rose-400 rounded-lg text-white font-semibold hover:bg-rose-500"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(donor.request_id)}
                  className="py-2 px-8 bg-rose-400  rounded-lg text-white font-semibold hover:bg-rose-500"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RequestResponse;
