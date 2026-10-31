import { useState, useEffect } from "react";

const RequestResponse = () => {
  const [gettingResponse, setGettingResponse] = useState(false);
  const [responseDetail, setResponseDetail] = useState({});
  const [feedback, setFeedback] = useState(null);

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
      if (!response.ok || result.success) {
        throw new Error("Unable to get response.");
      }
      setResponseDetail(response.data);
      setFeedback(result.message);
    } catch (error) {
      console.error(error);
    } finally {
      setGettingResponse(false);
    }
  };
  useEffect(() => {
    handleResponseData();
  }, []);
  return (
    <div>
      {responseDetail.map((index, data) => (
        <div key={index}>{data.message}</div>
      ))}
    </div>
  );
};

export default RequestResponse;
