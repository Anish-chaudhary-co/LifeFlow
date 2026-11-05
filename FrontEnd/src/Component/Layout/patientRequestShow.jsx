import { useState } from "react";
import showBg from "../../assets/showBg.png";

import {
  FaTint,
  FaHospital,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
  FaTimes,
  FaCommentDots,
  FaPaperPlane,
  FaCalendarAlt,
} from "react-icons/fa";

const PatientRequestShow = ({ selectRequest, setCancelRequest }) => {
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
      if (result.success) {
        setCancelRequest(false);
        console.log(result.message);

        setFeedback(result.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-black/80">
      <div
        className="p-4 w-98 md:w-[700px]  bg-white shadow-2xl border rounded-2xl m-2 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${showBg})` }}
      >
        <form onSubmit={handleResponse} className="relative">
          <div className="flex gap-4 md:gap-4">
            <span className="flex  items-center px-4 h-12 rounded-xl bg-rose-400 text-white text-xl font-bold">
              {selectRequest.BloodType}
            </span>
            <span className="border border-rose-500"></span>
            <span>
              <h1 className="font-bold text-2xl">
                {selectRequest.patientName}
              </h1>
              <p className="flex gap-2 text-red-500">
                <FaTint color="red" />
                {selectRequest.unitNeeded}
                <strong>Unit Needed</strong>
              </p>
            </span>
          </div>
          <span className="flex flex-col gap-2 font-semibold mt-6">
            <div className="flex gap-2 font-semibold">
              <FaHospital />
              <p>{selectRequest.hospitalName}</p>
            </div>
            <div className="flex gap-2 font-semibold">
              <FaPhone />
              <p>{selectRequest.hospitalPhone}</p>
            </div>
            <div className="flex gap-2 font-semibold">
              <FaMapMarkerAlt />
              <p>{selectRequest.address}</p>
            </div>
            <div className="flex gap-2 font-semibold">
              <FaVenusMars />
              <p>{selectRequest.gender}</p>
            </div>
          </span>
          <hr className="text-red-500 mt-2" />

          <div className="flex gap-4 mt-2">
            <p className="flex gap-2 items-center text-green-400">
              <FaCalendarAlt />
              <strong>Request on: </strong>
              {selectRequest.created_date}
            </p>
            <p className="border border-red-500"></p>
            <p>
              <strong className="flex gap-2 items-center text-rose-500">
                <FaCalendarAlt />
                Needed blood in : {selectRequest.period}.
              </strong>
            </p>
          </div>
          <span className="flex gap-2 mt-2 items-center font-semibold">
            <FaCommentDots color="red" />
            Your message to the patient
          </span>
          <div className="grid grid-cols-1 gap-2 mt-2">
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
                className="flex gap-2 items-center px-3 h-10 bg-rose-500 rounded-lg font-bold text-white hover:bg-rose-300"
              >
                <FaPaperPlane color="white" />
                {isSubmitting ? "Sending..." : "Send Response"}
              </button>
              <button
                type="button"
                onClick={() => setCancelRequest(false)}
                className="border border-rose-400 px-3 h-10 w-25 bg-white  rounded-lg font-bold hover:bg-rose-300"
              >
                Cancel
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCancelRequest(false)}
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
