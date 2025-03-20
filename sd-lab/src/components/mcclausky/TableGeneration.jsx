export const TableGeneration = ({ minterms, variables }) => {
  // Construir arreglo de los minterms
  const mintermsArrS = minterms.split(",");

  // Pasar arreglo a int
  const mintTermsI = mintermsArrS.map((minS) => parseInt(minS));

  // Convertir cada minterms a Binario
  const minBinarys = mintTermsI.map((minI) =>
    minI.toString(2).padStart(variables, 0)
  );

  // Generar las letras para las variables dependiendo de n variables
  const variablesHead = Array.from({ length: variables }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // 'A', 'B', 'C', ...

//   console.log(minBinarys);

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
          </tr>
        </thead>
        <tbody>
          {minBinarys.map((binary, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border px-4 py-2">{mintermsArrS[rowIndex]}</td>
              {binary.split("").map((bit, colIndex) => (
                <td key={colIndex} className="border px-4 py-2">
                  {bit}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
