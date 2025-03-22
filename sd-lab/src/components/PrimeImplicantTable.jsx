export const PrimeImplicantTable = ({ primeImplicants, minterms }) => {
  const sortedMinterms = [...minterms].sort((a, b) => a - b);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Tabla de Implicantes Primos</h2>
      <table className="min-w-full border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border px-2 py-1">Implicante</th>
            {sortedMinterms.map((m) => (
              <th key={m} className="border px-2 py-1">
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {primeImplicants.map((implicant, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1 font-mono">
                ({implicant.minterms.join(",")})
              </td>
              {sortedMinterms.map((m) => (
                <td key={m} className="border px-2 py-1 text-black-600">
                  {implicant.minterms.map(Number).includes(Number(m))
                    ? "X"
                    : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
