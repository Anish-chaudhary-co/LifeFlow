import { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ActivityChart() {
  const [activityData, setActivityData] = useState([]);
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(
          "http://localhost/LifeFlow/Blood-Donation/BackEnd/Dashboard/monthlyDonation.php",
          {
            method: "GET",
            credentials: "include",
          },
        );

        const result = await response.json();

        if (result.success) {
          setActivityData(result.activityData);
          setYear(result.year);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivity();
  }, []);

  return (
    <div className="w-full rounded-xl bg-white p-5 shadow">
      <h2 className="mb-5 text-xl font-semibold">Donation Activity {year}</h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar dataKey="donations" fill="#f43f5e" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ActivityChart;
