import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import HowToUse from "../Component/Home/howToUse";
import Notification from "../Component/Layout/notification";
import DonationCamp from "../assets/donationCamp.png";

import { CheckSessionContext } from "../Context/checkSession";
import { UserContext } from "../Context/AuthContext";

const Home = () => {
  const { userSession } = useContext(CheckSessionContext);
  const { setNotification } = useContext(UserContext);

  useEffect(() => {
    if (!userSession) {
      return;
    }

    setNotification(userSession);
    console.log(userSession);
  }, [userSession, setNotification]);

  const [count, setCount] = useState(null);

  useEffect(() => {
    const handleUserCount = async () => {
      try {
        const response = await fetch(
          "http://localhost/LifeFlow/Blood-Donation/BackEnd/include/homeUserCount.php",
          {
            method: "GET",
            credentials: "include",
          },
        );
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Could not load donor count.");
        }

        const total = Number(result.totalDonors);

        setCount(total);
      } catch (error) {
        console.error(error);
      }
    };

    handleUserCount();
  }, []);

  return (
    <div className="mt-10 font-semibold">
      <Notification />
      <div
        className="p-6 md:mt-15 h-98 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${DonationCamp})` }}
      >
        <div className="absolute inset-0 bg-black/70">
          <div className="relative z-20 md:mt-10 p-4">
            <span className=" font-bold text-xs px-2 rounded-2xl z-50 bg-rose-300 text-rose-500">
              ACTIVE EMERGENCIES NEAR YOU
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 relative">
              <div className="flex flex-col gap-3">
                <h2 className="font-bold text-4xl text-white">
                  Every drop is a{" "}
                  <span className="text-rose-500">LifeLine</span>.
                </h2>
                <p className="text-white">
                  LifeFlow matches verified donors with patients in critical
                  need instantly, locally, and securely.
                </p>
                {/* for show the number of donor */}
                <div className="flex mt-8 gap-4 text-white">
                  <div className="px-4 py-4 rounded-4xl border"></div>
                  <div className="flex flex-col">
                    <div>
                      <span>{count}</span> donors
                    </div>
                    <span className="text-white">
                      already saving lives in your city
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 md:absolute bottom-2 right-50">
              <NavLink
                to="/findDonor"
                className="flex gap-2 text-center py-2 px-2 border text-white bg-rose-500 rounded-lg"
              >
                Find Donor <FaArrowCircleRight className="mt-1" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <HowToUse />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2 md:p-20 m-2 md:m-25 border rounded-2xl bg-blue-950">
        <div>
          <h1 className="font-bold text-4xl text-white">
            Be someone's reason to live another day.
          </h1>
          <p className="text-slate-400">
            Join verified donors building a faster, safer blood network.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <NavLink
            to="/registerSignIn"
            onClick={() => window.scrollTo(0, 0)}
            className="py-2 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-400"
          >
            Become a donor
          </NavLink>
          <NavLink
            to="/findDonor"
            className="py-2 rounded-xl bg-blue-800 hover:bg-blue-900"
          >
            Find a Bank
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
