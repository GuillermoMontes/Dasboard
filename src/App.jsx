import { useEffect, useState } from "react";
import productos from "@/data/productos.json";
import RadialChart from "@/components/RadialChart.jsx";
import PieChartKilos from "@/components/PieChartKilos.jsx";
import BarChartFamilia from "@/components/BarChartFamilia";
import TablaSalidas from "@/components/TablaSalidas";
import StatsPanel from "@/components/StatsPanel";
import "./app.css";

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
    <>
      <div data-theme="dark" className="min-h-screen bg-background text-foreground">
      <div className=" px-4 py-2 grid grid-cols-1 md:grid-cols-5 gap-2 items-start">
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
      <div className="flex gap-1">
        <div className="mb-4 px-6">
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Filtrar por PlanNro:
          </label>
          <select
            value={planSeleccionado}
            onChange={(e) => setPlanSeleccionado(e.target.value)}
            className="w-full max-w-sm border border-border bg-background text-foreground rounded px-3 py-2 text-sm"

          >
            <option value="">Todos</option>
            {[...new Set(productos.salidas.map((s) => s.PlanNro))]
              .sort((a, b) => a - b)
              .map((plan) => (
                <option key={plan} value={String(plan)}>
                  Plan {plan}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4 px-6">
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Filtrar por Tropa:
          </label>
          <select
            value={tropaSeleccionada}
            onChange={(e) => setTropaSeleccionada(e.target.value)}
            className="w-full max-w-sm border border-border bg-background text-foreground rounded px-3 py-2 text-sm"

          >
            <option value="">Todas</option>
            {[...new Set(productos.salidas.map((s) => s.Tropa))]
              .sort((a, b) => a - b)
              .map((tropa) => (
                <option key={tropa} value={String(tropa)}>
                  Tropa {tropa}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4 px-6">
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Filtrar por Destino:
          </label>
          <select
            value={destinoSeleccionado}
            onChange={(e) => setDestinoSeleccionado(e.target.value)}
            className="w-full max-w-sm border border-border bg-background text-foreground rounded px-3 py-2 text-sm"

          >
            <option value="">Todos</option>
            {[...new Set(productos.salidas.map((s) => s.Destino))]
              .sort()
              .map((destino) => (
                <option key={destino} value={destino}>
                  {destino}
                </option>
              ))}
          </select>
        </div>
      </div>

      
      <BarChartFamilia data={dataFamilias} />

      
      <TablaSalidas data={salidasFiltradas} />
      </div>
    </>
  );
}

export default App;
