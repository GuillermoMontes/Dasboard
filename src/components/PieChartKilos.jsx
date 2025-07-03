import { PieChart, Pie, ResponsiveContainer } from "recharts";

function PieChartKilos({ totalKg }) {
  const maxKg = totalKg * 1.2; // Valor de referencia para el total
  const percentage = totalKg / maxKg;

  const data = [
    {
      name: "Ingresado",
      value: totalKg,
      fill: "#208d60", // Verde
    },
    {
      name: "Restante",
      value: maxKg - totalKg,
      fill: "#e5f5eb", // Verde claro
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md w-full h-[220px] max-w-sm mx-auto relative  ">
      <h3 className="text-sm font-semibold text-gray-600 mb-2 text-center">
        Total Kilos
      </h3>

      <div className="absolute top-[95px] left-1/2 -translate-x-1/2 text-center z-10">
        <p className="text-[#208d60] text-2xl font-bold">
          {totalKg.toLocaleString()} KG
        </p>
        <p className="text-gray-500 text-sm -mt-1">Ingresados</p>
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            stroke="none"
            isAnimationActive={true}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartKilos;
