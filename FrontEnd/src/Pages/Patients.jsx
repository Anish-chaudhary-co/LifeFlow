import { useContext, useEffect, useState } from "react";
import BackGround from "../assets/background.png";
import PatientRequestShow from "../Component/Layout/patientRequestShow";
import { CheckSessionContext } from "../Context/checkSession";
import { UserContext } from "../Context/AuthContext";
import {
  FaTint,
  FaCalendarAlt,
  FaHospital,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Patients = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [cancelRequest, setCancelRequest] = useState(false);
  const [selectRequest, setSelectRequest] = useState(null);
  const { userSession } = useContext(CheckSessionContext);
  const { setNotification } = useContext(UserContext);

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
    if (!userSession?.loggedIn) {
      navigate("/signIn");
      setNotification(userSession);
      return;
    }
    setCancelRequest(!cancelRequest);
    setSelectRequest(patientData);
  };

  return (
    <div
      className="p-2 md:p-30 bg-cover bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      {cancelRequest && (
        <PatientRequestShow
          selectRequest={selectRequest}
          cancelRequest={cancelRequest}
          setCancelRequest={setCancelRequest}
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
              className="rounded-lg border border-rose-200 shadow-rose-200 shadow-xl bg-white  p-5 relative"
            >
              <div className="flex gap-6 relative">
                <div>
                  <span className="p-2 rounded-xl bg-rose-200 text-red-500 text-xl font-bold">
                    {patient.BloodType}
                  </span>
                  <p className="absolute md:top-4 top-2 right-1 md:right-4 px-2 rounded-3xl bg-rose-200 shadow-[0_4px_10px_2px_rgba(0,0,0,0.25)]">
                    <div className="flex gap-2 text-red-500">
                      <FaCalendarAlt size={16} className="mt-1" />
                      {patient.created_date}
                    </div>
                  </p>
                </div>
                <div className="flex flex-col font-semibold">
                  <h2 className="text-xl font-bold">{patient.patientName}</h2>
                  <div className="mt-2">
                    <p className="flex gap-2 text-rose-400">
                      <FaTint color="red" />
                      {patient.unitNeeded} Unit needed
                    </p>
                    <p className="flex gap-2 text-green-400">
                      <FaCalendarAlt />
                      <strong>Needed Date:</strong>
                      {patient.period}
                    </p>

                    <p className="flex gap-2">
                      <FaHospital />
                      {patient.hospitalName}
                    </p>

                    <p className="flex gap-2">
                      <FaPhone />
                      {patient.hospitalPhone}
                    </p>

                    <p className="flex gap-2">
                      <FaMapMarkerAlt color="red" />
                      {patient.address}
                    </p>
                    <p className="flex gap-2">
                      <FaVenusMars color="red" />
                      {patient.gender}
                    </p>
                  </div>
                  <hr className="text-red-500 mt-4 md:w-[30rem]" />
                  <div className="flex mt-4">
                    {patient.notes && (
                      <div className="flex gap-2">
                        <p className="font-bold">Notes:</p>
                        <p className="px-2 border border-rose-200 bg-rose-200 w-full rounded-sm line-clamp-3 break-all">
                          {patient.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <button
                      onClick={() => handleViewRequest(patient)}
                      className="px-2 py-2 bg-red-500 text-white font-semibold hover:bg-rose-300 rounded-lg mt-4"
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
