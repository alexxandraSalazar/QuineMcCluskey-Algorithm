export const TableGroup = ({ table, index, variablesHead }) => {
    const grouped = {};
    table.forEach((item) => {
      if (!grouped[item.ones]) grouped[item.ones] = [];
      grouped[item.ones].push(item);
    });
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Tabla {index + 1}</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border px-4 py-2">Minterms</th>
              {variablesHead.map((varLabel, index) => (
                <th key={index} className="border px-4 py-2">{varLabel}</th>
              ))}
              <th className="border px-4 py-2">N° 1s</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(grouped)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([ones, items]) =>
                items.map((item, i) => (
                  <tr key={item.binary + item.minterms.join(",")}>
                    <td className="border px-4 py-2">({item.minterms.join(",")})</td>
                    {item.binary.split("").map((bit, j) => (
                      <td key={j} className="border px-4 py-2">{bit}</td>
                    ))}
                    {i === 0 && (
                      <td
                        className="border px-4 py-2 text-center"
                        rowSpan={items.length}
                      >
                        {ones}
                      </td>
                    )}
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
    );
  };
  