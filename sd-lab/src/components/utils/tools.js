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

export const getEssentialPrimeImplicants = (primeImplicants, minterms) => {
  const coverMap = {};

  // Paso 1: construir mapa minterm → [implicantes que lo cubren]
  for (const m of minterms) {
    coverMap[m] = [];
    for (const implicant of primeImplicants) {
      
      const coveredMinterms = implicant.minterms.map(Number);
      if (coveredMinterms.includes(Number(m))) {
        coverMap[m].push(implicant);
      }
    }
  }

  // Paso 2: identificar implicantes que cubren minterms unicos (esenciales)
  const essentials = new Set();
  for (const m of minterms) {
    const implicantsThatCover = coverMap[m];
    if (implicantsThatCover.length === 1) {
      essentials.add(implicantsThatCover[0]); // el unico que cubre este minterm
    }
  }

  return Array.from(essentials);
};

export const binaryToBooleanExpression = (binary, variables) => {
  return binary
    .split("")
    .map((bit, index) => {
      if (bit === "-") return "";
      return bit === "1" ? variables[index] : `${variables[index]}'`;
    })
    .join("");
};