import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StatsPanel({ data, active, onSelect }) {
  return (
    <Card className="py-0">
      <CardHeader className="flex border-b p-0">
        <div className="flex w-full">
          {Object.keys(data).map((key) => (
            <button
              key={key}
              data-active={active === key}
              onClick={() => onSelect(key)}
              className="data-[active=true]:bg-muted/50 flex-1 px-6 py-4 text-left border-r last:border-r-0 transition-colors"
            >
              <span className="text-muted-foreground text-xs">{key}</span>
              <div className="text-2xl font-bold">{data[key]}</div>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-sm text-muted-foreground">
          {active === "Programado"
            ? "Cantidad planificada de unidades"
            : "Unidades efectivamente ingresadas"}
        </CardTitle>
      </CardContent>
    </Card>
  );
}

export default StatsPanel;
