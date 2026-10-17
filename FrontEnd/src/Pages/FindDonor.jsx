import { useState, useEffect } from "react";

const bloodGroup = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const FindDonor = () => {
  const [donors, setDonors] = useState([]);
  const [bloodGroupFilter, setBloodGroupFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDonors = async () => {
      try {
        const response = await fetch(
          "http://localhost/LifeFlow/Blood-Donation/BackEnd/include/findDonor.php",
          {
            method: "GET",
            credentials: "include",
          },
        );

        const result = await response.json();
        if (!response.ok || !result.success || !Array.isArray(result.donors)) {
          throw new Error(result.message || "Unable to load donor details.");
        }

        if (isMounted) {
          setDonors(result.donors);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setErrorMessage(error.message || "Unable to load donor details.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDonors();

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredDonors = donors.filter((donor) => {
    const matchesBloodGroup =
      bloodGroupFilter === "All" || donor.BloodGroup === bloodGroupFilter;
    const matchesSearch =
      !normalizedSearchTerm ||
      [donor.FullName, donor.Address, donor.BloodGroup]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearchTerm));

    return matchesBloodGroup && matchesSearch;
  });

  return (
    <div className="pt-20 p-2 md:p-20 max-h-max bg-slate-200">
      <h1 className="font-bold text-5xl">Find a donor</h1>
      <span className="font-sm text-slate-400">
        {isLoading
          ? "Loading donors..."
          : `${filteredDonors.length} donor${filteredDonors.length === 1 ? "" : "s"} match your filter.`}
      </span>
      <div className="mt-10 flex gap-6">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, address, or blood group"
          aria-label="Search donors"
          className="border px-4 h-10 w-full rounded-3xl bg-white focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none"
        />

        <select
          value={bloodGroupFilter}
          onChange={(e) => {
            setBloodGroupFilter(e.target.value);
          }}
          aria-label="Filter by blood group"
          className="px-6 text-center font-semibold bg-rose-400 rounded-lg border-slate-300 focus:border-rose-400 focus:ring-2 outline-none focus:ring-rose-400"
        >
          {bloodGroup.map((group) => (
            <option
              key={group}
              value={group}
              className="font-semibold text-center bg-white rounded-2xl"
            >
              {group}
            </option>
          ))}
        </select>
      </div>

      {errorMessage ? (
        <p className="mt-10" role="alert">
          {errorMessage}
        </p>
      ) : !isLoading && filteredDonors.length === 0 ? (
        <p className="mt-10" role="status">
          No donors match your search.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredDonors.map((donor) => (
            <div
              key={donor.UserId}
              className="m-2 bg-white rounded-lg border border-orange-200 p-5 shadow-sm"
            >
              <div className="flex gap-6">
                <span className="border rounded-4xl p-2">IMG</span>
                <h2 className="text-xl font-semibold">{donor.FullName}</h2>
                <span className="rounded-4xl bg-orange-100 p-2 font-semibold text-rose-500">
                  {donor.BloodGroup}
                </span>
              </div>
              <div className="flex flex-col gap-2 pl-10 ">
                <p className="text-sm text-slate-500">Gender: {donor.Gender}</p>
                <p className="text-sm text-slate-500">
                  Address: {donor.Address}
                </p>
                <p className="text-sm text-slate-500">Contact: {donor.Phone}</p>
              </div>
              <button className="text-center bg-rose-600 font-semibold text-white w-full py-2 rounded-3xl mt-2 hover:bg-rose-300">
                Contact Donor
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindDonor;
