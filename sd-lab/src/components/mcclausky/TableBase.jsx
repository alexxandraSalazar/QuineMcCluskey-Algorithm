import { numberOfOneInMinterms } from "./tools";

export const TableBase = ({ variablesHead, binarySorted, mintermsSorted }) => {
  const groupOfOneMinterms = numberOfOneInMinterms(binarySorted);
  // Agrupar indices según la cantidad de 1's
  const groupedByOnes = {};
  groupOfOneMinterms.forEach((count, index) => {
    if (!groupedByOnes[count]) {
      groupedByOnes[count] = [];
    }
    groupedByOnes[count].push(index);
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Minterms</th>
            {variablesHead.map((varLabel, index) => (
              <th key={index} className="border px-4 py-2">
                {varLabel}
              </th>
            ))}
            <th className="border px-4 py-2">N° 1s</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedByOnes).map(([ones, indices]) =>
            indices.map((rowIndex, i) => (
              <tr key={rowIndex}>
                <td className="border px-4 py-2">{mintermsSorted[rowIndex]}</td>
                {binarySorted[rowIndex].split("").map((bit, colIndex) => (
                  <td key={colIndex} className="border px-4 py-2">
                    {bit}
                  </td>
                ))}
                {i === 0 && (
                  <td
                    className="border px-4 py-2 text-center"
                    rowSpan={indices.length}
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
