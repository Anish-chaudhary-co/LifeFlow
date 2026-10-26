import { useEffect, useState } from "react";
import PatientRequestShow from "../Component/Layout/patientRequestShow";
import {
  FaTint,
  FaCalendarAlt,
  FaHospital,
  FaPhone,
  FaMapMarkerAlt,
  FaGenderless,
} from "react-icons/fa";
const Patients = () => {
  const [request, setRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [sendRequest, setSendRequest] = useState(false);
  const [selectRequest, setSelectRequest] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const handlePatient = async () => {
      try {
        const response = await fetch(
          "http://localhost/LifeFlow/Blood-Donation/BackEnd/include/patient.php",
          {
            method: "GET",
            credentials: "include",
          },
        );
        const result = await response.json();
        if (!response.ok || !result.success || !Array.isArray(result.patient)) {
          throw new Error(result.message || "Unable to load patient requests.");
        }

        if (isMounted) {
          setRequest(result.patient);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unable to load patient requests.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    handlePatient();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewRequest = (patientData) => {
    setSendRequest(!sendRequest);
    setSelectRequest(patientData);
  };

  return (
    <div className="p-2 md:p-30 bg-slate-100">
      {sendRequest && (
        <PatientRequestShow
          selectRequest={selectRequest}
          sendRequest={sendRequest}
          setSendRequest={setSendRequest}
        />
      )}
      <h1 className="font-bold text-3xl">Patient blood requests</h1>
      {isLoading ? (
        <p className="mt-4" role="status">
          Loading patient requests...
        </p>
      ) : errorMessage ? (
        <p className="mt-4 text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : request.length === 0 ? (
        <p className="mt-4" role="status">
          No patient requests found.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {request.map((patient, index) => (
            <div
              key={index}
              className="rounded-lg border border-orange-200 shadow-2xl bg-white  p-5 relative"
            >
              <div className="flex gap-6 relative">
                <div>
                  <span className="border p-2 rounded-xl bg-rose-400 text-white font-semibold">
                    {patient.BloodType}
                  </span>
                  <p className="absolute md:top-4 top-2 right-1 md:right-4 px-2 rounded-3xl bg-rose-400 shadow-[0_4px_10px_2px_rgba(0,0,0,0.25)]">
                    {patient.created_date}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">
                    {patient.patientName}
                  </h2>
                  <div className="mt-2">
                    <p className="flex gap-2 text-rose-400">
                      <FaTint />
                      {patient.unitNeeded} Unit needed
                    </p>
                    <p className="flex gap-2 text-green-400">
                      <strong>Needed Date:</strong>
                      <FaCalendarAlt />
                      {patient.period}
                    </p>
                    <div className="flex gap-2">
                      <p className="flex gap-2">
                        <FaHospital />
                        {patient.hospitalName},
                      </p>
                      <p className="flex gap-2">
                        <FaPhone />
                        {patient.hospitalPhone}
                      </p>
                    </div>

                    <p className="flex gap-2">
                      <FaMapMarkerAlt />
                      {patient.address}
                    </p>
                    <p className="flex gap-2">
                      <FaGenderless />
                      {patient.gender}
                    </p>
                  </div>
                  <div className="flex">
                    {patient.notes && (
                      <div>
                        <strong>Notes:</strong>
                        <p className="px-2 py-2 border border-rose-200 w-full rounded-sm line-clamp-3 break-all">
                          {patient.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <button
                      onClick={() => handleViewRequest(patient)}
                      className="px-2 bg-rose-400 text-white font-semibold hover:bg-rose-300 rounded-lg mt-4 h-10"
                    >
                      View request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Patients;
