import { useState, useEffect } from "react";
import BloodRequest from "../../assets/bloodRequest.png";

const RequestResponse = () => {
  const [acceptData, setAcceptData] = useState([]);
  const [confirm, setConfirm] = useState("Confirm");
  const handleAcceptedRequest = async () => {
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/dashboard/requestResponse.php",
        {
          method: "GET",
          credentials: "include",
        },
      );
      const result = await response.json();
      const value = result.acceptedData ?? [];

      if (value[0]?.status === "Confirm") {
        setConfirm("Confirmed");
      }
      setAcceptData(result.acceptedData);
      console.log(result.acceptedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleAcceptedRequest();
  }, []);

  const handleConfirm = async (requestId) => {
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/dashboard/confirmRequest.php",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({
            requestId: requestId,
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
    <div>
      {acceptData.length === 0 ? (
        <p>No accepted requests found.</p>
      ) : (
        acceptData.map((accept) => (
          <div
            key={accept.id}
            className="border p-4 relative"
            style={{ backgroundImage: `url(${BloodRequest})` }}
          >
            <p>{accept.message}</p>
            <p>{accept.id}</p>

            <div className="absolute right-4 bottom-4">
              <button
                disabled={accept.status === "Confirm"}
                onClick={() => handleConfirm(accept.request_id)}
              >
                {accept.status === "Confirm" ? "Confirmed" : "Confirm"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestResponse;
