import { TableBase } from "./TableBase";
import { quineMcCluskey } from "./utils/quineMcclasky";
import { PrimeImplicantTable } from "./PrimeImplicantTable";
import {
  binaryToBooleanExpression,
  getEssentialPrimeImplicants,
  mintermsToBinary,
  sortMintermsByOnes,
} from "./utils/tools";

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

  const essentialPrimeImplicants = getEssentialPrimeImplicants(
    primeImplicants,
    originalMinterms
  );

  const expressionTerms = essentialPrimeImplicants.map((imp) =>
    binaryToBooleanExpression(imp.binary, variablesHead)
  );

  const finalExpression = expressionTerms.join(" + ");

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

      <div className="mt-6 p-4 border rounded-md bg-gray-50">
        <h3 className="font-semibold mb-2">Expresión mínima:</h3>
        <p className="font-mono text-lg">{finalExpression}</p>
      </div>
    </div>
  );
};
