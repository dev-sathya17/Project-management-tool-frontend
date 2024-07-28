import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PieChartComponent = () => {
  const data = [
    { name: "Backlogs", value: 20 },
    { name: "Idle", value: 30 },
    { name: "In-Progress", value: 50 },
    { name: "Completed", value: 10 },
  ];

  const COLORS = ["#4caf50", "#ff9800", "#ff5722", "#f44336"];

  return (
    <ResponsiveContainer width={"80%"} height={"80%"}>
      <PieChart>
        <Pie
          data={data}
          labelLine={false}
          // label={({ name, percent }) =>
          //   `${name}: ${(percent * 100).toFixed(0)}%`
          // }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
