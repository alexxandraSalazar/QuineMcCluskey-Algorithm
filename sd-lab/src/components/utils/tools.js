export const sortMintermsByOnes = (binaryArray, mintermArray) => {
  const paired = binaryArray.map((bin, i) => ({
    binary: bin,
    minterm: mintermArray[i],
    count: bin.split("").filter((b) => b === "1").length,
  }));

  const sorted = paired.sort((a, b) => a.count - b.count);

  return {
    binarySorted: sorted.map((item) => item.binary),
    mintermsSorted: sorted.map((item) => item.minterm),
    groupOfOneMinterms: sorted.map((item) => item.count),
  };
};

// Convertir los minterms a Binario
export const mintermsToBinary = (minterms, variables) => {
  // Construir arreglo de los minterms
  const mintermsArrS = minterms.split(",");

  // Pasar arreglo a int
  const mintTermsI = mintermsArrS.map((minS) => parseInt(minS));

  // Convertir cada minterms a Binario
  const minBinarys = mintTermsI.map((minI) =>
    minI.toString(2).padStart(variables, "0")
  );

  return {
    minBinarys,
    mintermsArrS,
  };
};
