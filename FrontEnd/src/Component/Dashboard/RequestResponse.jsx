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
  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-black/70">
      <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto p-6 rounded-lg relative bg-white shadow-2xl">
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
            <div key={donor.id} className="mb-4 rounded-lg border p-4">
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
              </p>
              <p>
                <strong>Message:</strong> {donor.message}
              </p>
              {donor.status && (
                <p>
                  <strong>Status:</strong> {donor.status}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RequestResponse;
