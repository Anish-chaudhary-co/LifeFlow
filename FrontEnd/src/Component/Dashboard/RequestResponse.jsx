import { useState, useEffect } from "react";

const RequestResponse = () => {
  const [gettingResponse, setGettingResponse] = useState(false);
  const [responseDetail, setResponseDetail] = useState([]);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const handleResponseData = async () => {
      setGettingResponse(true);
      try {
        const response = await fetch(
          "http://localhost/LifeFlow/Blood-Donation/BackEnd/api/getUserDetail.php",
          {
            method: "GET",
            credentials: "include",
          },
        );
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to get response.");
        }
        if (isMounted) {
          setResponseDetail(result.donorDetail);
          setFeedback(result.message);
        }
      } catch (error) {
        console.error(error);
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
  }, []);
  return (
    <div>
      <div>
        {responseDetail.map((donor, index) => (
          <div key={index}>
            <p>{donor.FullName}</p>
          </div>
        ))}
      </div>
      {feedback ? <div>{feedback}</div> : <div>Loading.......</div>}
    </div>
  );
};

export default RequestResponse;
