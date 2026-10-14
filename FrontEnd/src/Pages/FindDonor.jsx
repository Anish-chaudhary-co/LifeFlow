import { useEffect, useState } from "react";

const FindDonor = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const handleDonors = async () => {
      try {
        const response = await fetch(
          "http://localhost/LifeFlow/Blood-Donation/BackEnd/include/findDonor.php",
          { credentials: "include" },
        );

        const result = await response.json();
        console.log(result);

        if (result.success) {
          setDonors(result.donors || []);
        } else {
          console.error(result.message || "Failed to fetch donors");
        }
      } catch (error) {
        console.error("Fetch donor error:", error);
      }
    };

    handleDonors();
  }, []);

  return (
    <div className="m-20">
      <h1 className="font-bold text-5xl">Find a blood</h1>
      <span className="font-sm text-slate-400">
        {donors.length} verified donors match your filter.
      </span>

      <div className="mt-10 flex gap-6">
        <input
          type="search"
          className="border px-4 h-10 w-full rounded-3xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none"
        />

        <button className="h-10 px-4 bg-rose-500 rounded-xl">All</button>
        <button className="h-10 px-4 min-w-fit bg-rose-500 rounded-xl">
          Available now
        </button>
      </div>

      <div className="mt-6">
        {donors.length > 0 ? (
          donors.map((donor, index) => (
            <div key={index} className="border p-3 rounded mb-2">
              <p>{donor.FullName}</p>
              <p>{donor.BloodGroup}</p>
              <p>{donor.Phone}</p>
            </div>
          ))
        ) : (
          <p>No donors found.</p>
        )}
      </div>
    </div>
  );
};

export default FindDonor;
