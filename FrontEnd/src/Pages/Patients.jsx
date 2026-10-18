import { useEffect, useState } from "react";

const Patients = () => {
  const [request, setRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <div className="p-2 md:p-30 bg-slate-100">
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
          {request.map((patient) => (
            <article
              key={patient.id}
              className="rounded-lg border border-orange-200 shadow-2xl bg-white  p-5 relative"
            >
              <div className="flex gap-6">
                <div>
                  <span className="border p-2 rounded-xl bg-rose-400 text-white font-semibold">
                    {patient.BloodType}
                  </span>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">
                    {patient.patientName}
                  </h2>
                  <div className="mt-2 text-slate-500">
                    <p>
                      <strong>Units:</strong> {patient.unitNeeded} Unit needed
                    </p>
                    <p>
                      <strong>Required by:</strong> {patient.period}
                    </p>
                    <p>
                      <strong>Hospital:</strong> {patient.hospitalName}
                    </p>
                    <p>
                      <strong>Hospital phone:</strong> {patient.hospitalPhone}
                    </p>
                    <p>
                      <strong>Address:</strong> {patient.address}
                    </p>
                  </div>
                  {patient.notes && (
                    <p>
                      <strong>Notes:</strong>
                      <div className="px-2 border border-rose-200 w-full rounded-2xl bg-green-200">
                        {patient.notes}
                      </div>
                    </p>
                  )}
                </div>
              </div>
              <button className="px-2 p-2 bg-rose-400 text-white font-semibold hover:bg-rose-300 rounded-lg mt-4 md:absolute bottom-4 right-4">
                View request
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Patients;
