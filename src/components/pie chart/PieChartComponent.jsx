import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PieChartComponent = ({ data }) => {
  const COLORS = ["#4caf50", "#ff9800", "#ff230b", "#2b8bff"];
  return (
    <>
      {data && (
        <ResponsiveContainer width={"80%"} height={"80%"}>
          <PieChart>
            <Pie
              data={data}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default PieChartComponent;
