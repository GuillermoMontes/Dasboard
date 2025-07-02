function StatsPanel({ data, active, onSelect }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden w-full">
      <div className="flex border-b">
        {Object.keys(data).map((key, index) => (
          <button
            key={key}
            data-active={active === key}
            onClick={() => onSelect(key)}
            className={`flex-1 px-6 py-4 text-left border-r last:border-r-0 transition-colors ${
              active === key ? "bg-green-50" : "hover:bg-gray-50"
            }`}
          >
            <span className="text-xs text-gray-500">{key}</span>
            <div className="text-2xl font-bold text-gray-900">{data[key]}</div>
          </button>
        ))}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600">
          {active === "Programado"
            ? "Cantidad planificada de unidades"
            : "Unidades efectivamente ingresadas"}
        </p>
      </div>
    </div>
  );
}

export default StatsPanel;
