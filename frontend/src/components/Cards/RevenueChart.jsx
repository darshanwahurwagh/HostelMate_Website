import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", revenue: 10000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 22000 },
  { month: "Apr", revenue: 18000 },
];

const RevenueChart = () => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
    </LineChart>
  );
};

export default RevenueChart;