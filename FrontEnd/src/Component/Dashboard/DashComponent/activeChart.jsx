import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const activityData = [
  { month: "Jan", donations: 20 },
  { month: "Feb", donations: 35 },
  { month: "Mar", donations: 25 },
  { month: "Apr", donations: 45 },
  { month: "May", donations: 30 },
  { month: "Jun", donations: 55 },
];

function ActivityChart() {
  return (
    <div className="w-full rounded-xl bg-white p-5 shadow">
      <h2 className="mb-5 text-xl font-semibold">Donation Activity</h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="donations" fill="#f43f5e" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ActivityChart;
