import { useState, useEffect, useContext } from "react";
import DasBackground from "../../assets/dasBackground.png";
import { DonorEligibilityContext } from "../../Context/eligibleContext";
import { FaTint, FaCalendarAlt } from "react-icons/fa";
import ActivityChart from "./DashComponent/activeChart";

const Overview = () => {
  const { setEligible } = useContext(DonorEligibilityContext);

  const date = new Date();
  console.log(date);
  const day = date.getDate();
  const month = date.getMonth("long");
  const year = date.getFullYear();
  const [overview, setOverview] = useState({});

  useEffect(() => {
    const handleOverview = async () => {
      try {
        const response = await fetch(
          "http://localhost/LifeFlow/Blood-Donation/BackEnd/Dashboard/donationRecord.php",
          {
            method: "GET",
            credentials: "include",
          },
        );
        const result = await response.json();
        if (result.success) {
          setEligible(result.eligibilityStatus);

          setOverview(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleOverview();
    console.log(overview.createDate ?? 0);
  }, []);

  return (
    <div className="mt-20 md:m-4">
      <div className="text-xl">
        {month}/{day}/{year}
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-4xl">Hello, Welcome back !!!</span>
        <span className="text-slate-400">
          Your small act can make a lasting difference.
        </span>
      </div>
      {/* active Chart */}
      <ActivityChart />

      {overview.eligibilityStatus === "Eligible" ? (
        <div className="flex flex-col gap-2 border border-green-500 rounded-xl p-3 mt-4 w-full bg-green-200">
          <span className="text-bold">You're eligible to donate</span>
          <span>Your next donation window opens in 12 days.</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2 border border-red-500 rounded-xl text-red-500 p-3 mt-4 w-full bg-red-200">
          <span className="text-bold">You're not eligible to donate.</span>
          <span>
            Your next donation window opens in {overview.remainingDays} days.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:gap-23 md:grid-cols-3 justify-between w-full mt-4">
        <div
          className="flex gap-8 border border-black p-4 rounded-lg h-fit w-full bg-cover"
          style={{ backgroundImage: `url(${DasBackground})` }}
        >
          <span className="px-2 py-2 rounded-full bg-rose-200">
            <FaTint color="red" size={60} />
          </span>
          <span>
            <p>Total Donation</p>
            <p className="font-bold text-4xl">
              {overview.successfully_donated}
            </p>
          </span>
        </div>
        <div
          className="flex gap-8 border border-black p-4 rounded-lg h-fit w-full bg-cover"
          style={{ backgroundImage: `url(${DasBackground})` }}
        >
          <span className="px-2 py-2 rounded-full bg-rose-200">
            <FaCalendarAlt color="red" size={60} />
          </span>
          <span>
            {overview.eligibilityStatus === "Eligible" ? (
              <p className="text-green-600">You are eligible to donate!</p>
            ) : (
              <p>
                {overview.remainingDays} days remaining until your next
                donation.
              </p>
            )}
          </span>
        </div>
        <div
          className="flex gap-8 border border-black p-4 rounded-lg h-fit w-full bg-cover"
          style={{ backgroundImage: `url(${DasBackground})` }}
        >
          <span className="px-2 py-2 rounded-full bg-rose-200">
            <FaTint color="red" size={60} />
          </span>
          <span>
            <p>Lives Helped</p>
            <p className="font-bold text-4xl">
              {overview.successfully_donated}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Overview;
