import { TableBase } from "./TableBase";
import { mintermsToBinary, numberOfOneInMinterms } from "./tools";

export const TableGeneration = ({ minterms, variables }) => {

  // Arreglo de minterms en binario - Arreglo de minterms
  const {minBinarys, mintermsArrS} = mintermsToBinary( minterms, variables );

  // Evaluar cada arreglo binario y ver cuantos 1 tiene cada uno
  const groupOfOneMinterms = numberOfOneInMinterms(minBinarys);

  // Reordenar arreglo de minterms en base a la cantidad de 1 que poseen
  const pares = groupOfOneMinterms.map((count, index) => ({index, count}));

  pares.sort((a,b) => a.count - b.count);

  const binarySorted = pares.map((par) => minBinarys[par.index]);
  const mintermsSorted = pares.map(par => mintermsArrS[par.index]);

  // Generar las letras para las variables dependiendo de n variables
  const variablesHead = Array.from({ length: variables }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // 'A', 'B', 'C', ...

  return (
    <div className="overflow-x-auto">
      <TableBase variablesHead={variablesHead} binarySorted={binarySorted} mintermsSorted={mintermsSorted} groupOfOneMinterms={groupOfOneMinterms}/>
    </div>
  );
};
