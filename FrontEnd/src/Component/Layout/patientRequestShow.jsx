import { useState } from "react";
import {
  FaTint,
  FaHospital,
  FaPhone,
  FaMapMarkerAlt,
  FaGenderless,
  FaTimes,
} from "react-icons/fa";

const PatientRequestShow = ({ selectRequest, setSendRequest }) => {
  const [RequestData, setRequestData] = useState(selectRequest);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleResponseMessage = (e) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResponse = async (e) => {
    console.log(RequestData);

    e.preventDefault();
    setIsSubmitting(true);
    setFeedback("");

    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/api/patientResponse.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestId: RequestData.id,
            patientId: RequestData.user_id,
            responseMsg: RequestData.responseMsg ?? "",
          }),
        },
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send the response.");
      }
      console.log(result.message);

      setFeedback(result.message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-black/80">
      <div className="p-4 w-98 md:w-[500px] bg-white shadow-2xl border rounded-2xl m-2 ">
        <form onSubmit={handleResponse} className="relative">
          <div className="flex gap-4 md:gap-18">
            <span className="flex  items-center px-2 h-10 rounded-3xl bg-rose-500 text-white font-semibold">
              {selectRequest.BloodType}
            </span>
            <span>
              <h1 className="font-bold text-2xl">
                {selectRequest.patientName}
              </h1>

              <p className="flex gap-2 text-red-500">
                <FaTint color="red" />
                {selectRequest.unitNeeded}
                <strong>Unit Needed</strong>
              </p>
              <div className="flex gap-2 font-black">
                <FaHospital />
                <p>{selectRequest.hospitalName}</p>
              </div>
              <div className="flex gap-2 font-black">
                <FaPhone />
                <p>{selectRequest.hospitalPhone}</p>
              </div>
              <div className="flex gap-2 font-black">
                <FaMapMarkerAlt />
                <p>{selectRequest.address}</p>
              </div>
              <div className="flex gap-2 font-black">
                <FaGenderless />
                <p>{selectRequest.gender}</p>
              </div>
            </span>
          </div>

          <p className="text-green-400">
            <strong>Request on : </strong>
            {selectRequest.created_date}
          </p>
          <p>
            <strong className="text-rose-500">
              Needed blood in {selectRequest.period}.
            </strong>
          </p>

          <div className="grid grid-cols-1 gap-2 mt-8">
            <textarea
              name="responseMsg"
              onChange={handleResponseMessage}
              required
              placeholder="Please give a message to patient......"
              className="border p-2 rounded-lg "
            ></textarea>
            {feedback && (
              <p role="status" className="text-sm text-rose-600">
                {feedback}
              </p>
            )}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-3 h-10 w-25 bg-rose-500 rounded-lg font-bold text-white hover:bg-rose-300"
              >
                {isSubmitting ? "Sending..." : "Response"}
              </button>
              <button
                type="button"
                onClick={() => setSendRequest(false)}
                className="border px-3 h-10 w-25 bg-white  rounded-lg font-bold hover:bg-rose-300"
              >
                Cancel
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSendRequest(false)}
            className="absolute top-2 right-2 hover:rose-500"
          >
            <FaTimes />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientRequestShow;
