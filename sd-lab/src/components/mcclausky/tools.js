// Convertir los minterms a Binario
export const mintermsToBinary = ( minterms, variables ) => {
  // Construir arreglo de los minterms
  const mintermsArrS = minterms.split(",");

  // Pasar arreglo a int
  const mintTermsI = mintermsArrS.map((minS) => parseInt(minS));

  // Convertir cada minterms a Binario
  const minBinarys = mintTermsI.map((minI) =>
    minI.toString(2).padStart(variables, 0)
  );

  return {
    minBinarys,
    mintermsArrS
  };
}

// Evaluar cada arreglo binario y ver cuantos 1 tiene cada uno
export const numberOfOneInMinterms = ( minBinarys ) => {
  return minBinarys.map(minB => minB.split('').filter(bit => bit === '1').length);
}

