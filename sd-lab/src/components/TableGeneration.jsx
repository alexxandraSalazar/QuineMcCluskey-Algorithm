import { TableBase } from "./TableBase";
import { quineMcCluskey } from "./utils/quineMcclasky";
import { PrimeImplicantTable } from "./PrimeImplicantTable";
import { mintermsToBinary, sortMintermsByOnes } from "./utils/tools";

export const TableGeneration = ({ minterms, variables }) => {
  const { minBinarys, mintermsArrS } = mintermsToBinary(minterms, variables);

  const { binarySorted, mintermsSorted, groupOfOneMinterms } =
    sortMintermsByOnes(minBinarys, mintermsArrS);

  const { _, primeImplicants } = quineMcCluskey(binarySorted, mintermsSorted);

  const variablesHead = Array.from({ length: variables }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  // Convertimos los minterms originales a número
  const originalMinterms = mintermsArrS.map(Number);

  // Filtramos los implicantes que cubren al menos un minterm original
  const relevantPrimeImplicants = primeImplicants.filter((implicant) =>
    implicant.minterms.some((m) => originalMinterms.includes(Number(m)))
  );

  return (
    <div className="overflow-x-auto">
      <TableBase
        variablesHead={variablesHead}
        binarySorted={binarySorted}
        mintermsSorted={mintermsSorted}
        groupOfOneMinterms={groupOfOneMinterms}
      />

      {/* Tabla final de implicantes primos */}
      <PrimeImplicantTable
        primeImplicants={relevantPrimeImplicants}
        minterms={originalMinterms}
      />
    </div>
  );
};
