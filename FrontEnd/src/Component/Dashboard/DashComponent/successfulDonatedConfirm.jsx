import { useState, useEffect } from "react";

const successfulDonatedConfirm = () => {
  const [donorData, setDonorData] = useState([]);

  const handleConfirmDonor = async () => {
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/Dashboard/confirmedDonors.php",
        {
          method: "GET",
          credentials: "include",
        },
      );
      const result = await response.json();
      if (result.success) {
        setDonorData(result.confirmData);
        console.log(result.confirmData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleConfirmDonor();
  }, []);

  const handleSuccessfulDonated = async (data) => {
    try {
      const response = await fetch(
        "http://localhost/LifeFlow/Blood-Donation/BackEnd/dashboard/successfulDonated.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            successfulData: {
              request_id: data.request_id,
              response_id: data.id,
              unit_donated: data.unit,
              confirmDate: data.confirmDate,
            },
          }),
        },
      );
      const text = await response.text();
      const result = JSON.parse(text);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {donorData.map((data) =>
        data.responseStatus === "Successfully Donated" ? (
          <p className="text-green-600 font-semibold">
            Donation successfully confirmed! ✓
          </p>
        ) : (
          <div key={data.donor_id} className="border rounded-xl p-4">
            <div className="flex justify-between">
              <div>
                <h1>Confirm Blood Donation</h1>
                <p>
                  Please verify the donor's details and confirm whether you have
                  received the blood.
                </p>
              </div>
              <div className="text-sm border ">Awaiting confirmation</div>
            </div>

            <div className="flex justify-between border">
              <div className="flex gap-5">
                <span className="border rounded-2xl w-10 h-10"></span>
                <span>
                  <p>{data.DonorName}</p>
                  <p>Blood Donor</p>
                </span>
              </div>
              <div className="border px-2 py-2 rounded-xl">
                {data.DonorBlood}
              </div>
            </div>

            <hr className="text-slate-500 mt-6" />

            <div className="grid md:grid-cols-2 grid-cols-1 mt-4">
              <div>
                Contact number
                <p className="font-bold">{data.DonorPhone}</p>
              </div>
              <div>
                Gender
                <p className="font-bold">{data.DonorGender}</p>
              </div>
              <div>
                Blood donated
                <p className="font-bold">{data.unit}</p>
              </div>
              <div>
                Address
                <p className="font-bold">{data.DonorAddress}</p>
              </div>
            </div>
            <strong className="font-bold">Patient details:</strong>
            <div className="">
              <span className="flex">
                Patient Name :<p className="">{data.patientName}</p>
              </span>
              <span className="flex">
                Blood Group :<p className="">{data.patientBlood}</p>
              </span>
              <span className="flex">
                Contact number : <p className="">{data.patientPhone}</p>
              </span>
            </div>

            <div className="flex flex-col gap-2 border p-4 mt-8">
              <h1>Did you receive the blood from this donor?</h1>
              <p>Only confirm if the donation was actually completed.</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleSuccessfulDonated(data)}
                  className="text-white font-bold py-2 rounded-2xl border bg-green-500 w-full"
                >
                  Confirm Received
                </button>
                <button className="text-white font-bold py-2 rounded-2xl border bg-slate-500 w-full">
                  Not Received
                </button>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default successfulDonatedConfirm;
