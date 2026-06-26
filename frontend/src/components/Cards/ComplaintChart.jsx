import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", complaints: 15 },
  { month: "Feb", complaints: 8 },
  { month: "Mar", complaints: 20 },
  { month: "Apr", complaints: 10 },
];

const ComplaintChart = () => {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="complaints" fill="#8884d8" />
    </BarChart>
  );
};

export default ComplaintChart;