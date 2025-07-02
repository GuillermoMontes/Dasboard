import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

function RadialChart({ value }) {
  const data = [
    {
      name: "Cumplimiento",
      porcentaje: value,
      fill: "#208d60", // Verde oscuro
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md w-full h-[220px] max-w-sm mx-auto border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-600 mb-2 text-center">
        Cumplimiento
      </h3>

      <ResponsiveContainer width="100%" height={140}>
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={450}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            minAngle={15}
            clockWise
            background
            dataKey="porcentaje"
            cornerRadius={10}
            animationDuration={1000}
          />
        </RadialBarChart>
      </ResponsiveContainer>

      <p className="text-center text-2xl font-bold text-[#208d60] mt-2">
        {value}%
      </p>
    </div>
  );
}

export default RadialChart;
