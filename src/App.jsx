import { useEffect, useState } from "react";
import productos from "@/data/productos.json";
import RadialChart from "@/components/RadialChart.jsx";
import PieChartKilos from "@/components/PieChartKilos.jsx";
import BarChartFamilia from "@/components/BarChartFamilia";
import TablaSalidas from "@/components/TablaSalidas";
import StatsPanel from "@/components/StatsPanel";
import ".app.css";

function App() {
  const [activeStat, setActiveStat] = useState("Programado");
  const [totalUni, setTotalUni] = useState(0);
  const [totalProg, setTotalProg] = useState(0);
  const [totalKg, setTotalKg] = useState(0);

  const [dataFamilias, setDataFamilias] = useState([]);
  const [planSeleccionado, setPlanSeleccionado] = useState("");
  const [tropaSeleccionada, setTropaSeleccionada] = useState("");
  const [salidasFiltradas, setSalidasFiltradas] = useState([]);
  const [destinoSeleccionado, setDestinoSeleccionado] = useState("");

  useEffect(() => {
    const entradas = productos.entradas;
    const salidas = productos.salidas;

    // Totales
    const sumaUni = entradas.reduce(
      (acc, item) => acc + Number(item.Uni || 0),
      0
    );
    const sumaProg = entradas.reduce(
      (acc, item) => acc + Number(item.Programado || 0),
      0
    );
    const sumaKg = entradas.reduce(
      (acc, item) => acc + Number(item.Kg || 0),
      0
    );

    setTotalUni(sumaUni);
    setTotalProg(sumaProg);
    setTotalKg(sumaKg);

    // Filtros combinados
    let salidasFiltradasTemp = salidas;

    if (planSeleccionado) {
      salidasFiltradasTemp = salidasFiltradasTemp.filter(
        (s) => String(s.PlanNro) === planSeleccionado
      );
    }

    if (tropaSeleccionada) {
      salidasFiltradasTemp = salidasFiltradasTemp.filter(
        (s) => String(s.Tropa) === tropaSeleccionada
      );
    }

    if (destinoSeleccionado) {
      salidasFiltradasTemp = salidasFiltradasTemp.filter(
        (s) => String(s.Destino) === destinoSeleccionado
      );
    }

    // kilos por familia
    const familiasMap = {};

    salidasFiltradasTemp.forEach((item) => {
      const familia = item.Familia || "Sin familia";
      const kg = Number(item.Kilos || 0);
      familiasMap[familia] = (familiasMap[familia] || 0) + kg;
    });

    const familiasArray = Object.entries(familiasMap).map(
      ([familia, kilos]) => ({
        familia,
        kilos,
      })
    );

    setDataFamilias(familiasArray);
    setSalidasFiltradas(salidasFiltradasTemp);
  }, [planSeleccionado, tropaSeleccionada, destinoSeleccionado]);

  const cumplimiento = totalProg ? Math.round((totalUni / totalProg) * 100) : 0;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="px-4 py-2 grid grid-cols-1 md:grid-cols-5 gap-2 items-start">
        <StatsPanel
          data={{
            Programado: totalProg,
            "Unidades Ingresadas": totalUni,
          }}
          active={activeStat}
          onSelect={setActiveStat}
        />
        <div className="col-span-1">
          <RadialChart value={cumplimiento} />
        </div>
        <div className="col-span-1">
          <PieChartKilos totalKg={totalKg} />
        </div>
      </div>

      {/* Filtros */}
      
      <div className="flex ">
        
          {[
            {
              label: "Filtrar por PlanNro:",
              value: planSeleccionado,
              onChange: setPlanSeleccionado,
              options: [
                ...new Set(productos.salidas.map((s) => s.PlanNro)),
              ].sort((a, b) => a - b),
              renderOption: (val) => `Plan ${val}`,
            },
            {
              label: "Filtrar por Tropa:",
              value: tropaSeleccionada,
              onChange: setTropaSeleccionada,
              options: [...new Set(productos.salidas.map((s) => s.Tropa))].sort(
                (a, b) => a - b
              ),
              renderOption: (val) => `Tropa ${val}`,
            },
            {
              label: "Filtrar por Destino:",
              value: destinoSeleccionado,
              onChange: setDestinoSeleccionado,
              options: [
                ...new Set(productos.salidas.map((s) => s.Destino)),
              ].sort(),
              renderOption: (val) => val,
            },
          ].map(({ label, value, onChange, options, renderOption }, idx) => (
            <div key={idx} className="m-4 px-6 gap-4 w-full">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                {label}
              </label>
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full max-w-sm  bg-white text-gray-900 rounded px-3 py-2 text-sm"
              >
                <option value="">Todos</option>
                {options.map((opt) => (
                  <option key={opt} value={String(opt)}>
                    {renderOption(opt)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
          <div className="flex items-center">
        <BarChartFamilia data={dataFamilias} />
        <TablaSalidas data={salidasFiltradas} />
        </div>
      </div>
    
  );
}

export default App;
