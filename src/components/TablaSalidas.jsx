import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="bg-background rounded-xl p-3 shadow-md mt-4 mx-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Detalle de Productos (Salidas)
      </h3>

      {/* <button
        onClick={() => exportarExcel(data)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
      >
        Exportar a Excel
      </button> */}

      <div className="max-h-[400px] overflow-y-auto overflow-x-auto rounded">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Familia</TableHead>
              <TableHead>Kilos</TableHead>
              <TableHead>Unidades</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>PlanNro</TableHead>
              <TableHead>Tropa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.Descripcion}</TableCell>
                <TableCell>{item.Familia}</TableCell>
                <TableCell>{item.Kilos}</TableCell>
                <TableCell>{item.Unidades}</TableCell>
                <TableCell>{item.Destino}</TableCell>
                <TableCell>{item.PlanNro}</TableCell>
                <TableCell>{item.Tropa}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TablaSalidas;
