import { PieChart, Pie, ResponsiveContainer } from "recharts";

function PieChartKilos({ totalKg }) {
  const data = [
    {
      name: "Ingresado",
      value: totalKg,
      fill: "var(--primary)" , 
    },
    {
      name: "Restante",
      value: totalKg * 0.2,
      fill: "var(--muted)", 
    },
  ];

  return (
    <div className="bg-background rounded-xl p-4 shadow-md w-full h-[220px] max-w-sm mx-auto relative">
      <h3 className="text-sm font-medium text-muted-foreground mb-2 text-center">

        Total Kilos
      </h3>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
        <p className="text-primary text-2xl font-bold">
          {totalKg.toLocaleString()} KG
        </p>
        <p className="text-muted-foreground text-sm -mt-1">Ingresados</p>
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={100}
            strokeWidth={0}
            isAnimationActive={true}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartKilos;
