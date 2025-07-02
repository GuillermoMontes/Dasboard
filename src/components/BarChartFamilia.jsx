import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function BarChartFamilia({ data }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-md w-full h-[200px] border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-600 mb-2 text-center">
        Kilos por Familia
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="familia" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="kilos" fill="#208d60" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartFamilia;
