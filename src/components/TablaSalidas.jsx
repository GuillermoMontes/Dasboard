import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function TablaSalidas({ data }) {
  function exportarExcel(data) {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salidas");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "salidas.xlsx");
  }

  return (
    <div className="bg-white rounded-xl p-3 shadow-md mt-4 mx-4 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-600 mb-4">
        Detalle de Productos (Salidas)
      </h3>

      {/* Botón opcional de exportación */}
      {/* <button
        onClick={() => exportarExcel(data)}
        className="mb-4 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
      >
        Exportar a Excel
      </button> */}

      <div className="max-h-[400px] overflow-y-auto overflow-x-auto rounded">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-900">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Producto</th>
              <th className="px-4 py-2 text-left font-semibold">Familia</th>
              <th className="px-4 py-2 text-left font-semibold">Kilos</th>
              <th className="px-4 py-2 text-left font-semibold">Unidades</th>
              <th className="px-4 py-2 text-left font-semibold">Destino</th>
              <th className="px-4 py-2 text-left font-semibold">PlanNro</th>
              <th className="px-4 py-2 text-left font-semibold">Tropa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item, i) => (
              <tr key={i} className="hover:bg-green-50 transition">
                <td className="px-4 py-2">{item.Descripcion}</td>
                <td className="px-4 py-2">{item.Familia}</td>
                <td className="px-4 py-2">{item.Kilos}</td>
                <td className="px-4 py-2">{item.Unidades}</td>
                <td className="px-4 py-2">{item.Destino}</td>
                <td className="px-4 py-2">{item.PlanNro}</td>
                <td className="px-4 py-2">{item.Tropa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaSalidas;
