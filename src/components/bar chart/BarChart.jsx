import {
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
} from "recharts";

const BarChartComponent = () => {
  const data = [
    { date: "6d ago", value: "6" },
    { date: "5d ago", value: "7" },
    { date: "7d ago", value: "4" },
    { date: "3d ago", value: "5" },
    { date: "4d ago", value: "2" },
    { date: "1d ago", value: "3" },
    { date: "2d ago", value: "1" },
  ];

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart data={data} width={48} height={48}>
        <Tooltip />
        <XAxis dataKey={"date"} />
        <YAxis dataKey={"value"} />
        <Bar dataKey="value" fill="rgb(255,2,2)" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
