// Toda la logica del algoritmo de Quine-Mcclasky

// binarySorted = minterms en binario por cantidad de 1
// mintermsSorted =  minterms ordenados por cantidad de 1
export const quineMcCluskey = (binarySorted, mintermsSorted) => {
  // Verificar en que cadenas de binarios existe una unica diferencia y capturar su indice
  const countDifferences = (bin1, bin2) => {
    let differences = 0,
      diffIndex = -1;
    for (let i = 0; i < bin1.length; i++) {
      if (bin1[i] !== bin2[i]) {
        differences++;
        diffIndex = i;
        if (differences > 1) return -1;
      }
    }
    return diffIndex;
  };

  // Para contar los 1 que posee cada cadena
  const countOnes = (binary) =>
    binary.split("").filter((b) => b === "1").length;

  // Estructura de los grupos / Objetos
  let currentGroups = binarySorted.map((binary, index) => ({
    binary,
    minterms: [mintermsSorted[index]],
    ones: countOnes(binary),
    used: false,
  }));

  // Guardar la tabla orignal, tabla 1
  const allTables = [[...currentGroups]];

  // Combinar n veces que sea posible
  while (true) {
    const nextGroups = [];
    const usedIndices = new Set();

    // Comparar todos los pares posibles
    for (let i = 0; i < currentGroups.length; i++) {
      for (let j = i + 1; j < currentGroups.length; j++) {
        // Binarios del grupo 1 con los del grupo 2
        const diffIndex = countDifferences(
          currentGroups[i].binary,
          currentGroups[j].binary
        );
        if (diffIndex !== -1) {
          const newBinary =
            currentGroups[i].binary.slice(0, diffIndex) +
            "-" +
            currentGroups[i].binary.slice(diffIndex + 1);
          const newMinterms = Array.from(
            new Set([
              ...currentGroups[i].minterms,
              ...currentGroups[j].minterms,
            ])
          ).sort((a, b) => a - b);

          if (
            !nextGroups.some(
              (g) =>
                g.binary === newBinary &&
                g.minterms.join(",") === newMinterms.join(",")
            )
          ) {
            nextGroups.push({
              binary: newBinary,
              minterms: newMinterms,
              ones: countOnes(newBinary.replace(/-/g, "0")),
              used: false,
            });
          }

          usedIndices.add(i);
          usedIndices.add(j);
        }
      }
    }

    // Cualquier termino que no fuese usado pasa a la siguiente tabla
    currentGroups.forEach((g, index) => {
      if (usedIndices.has(index)) {
        g.used = true; // ✅ Marcar los que fueron u  sados
      } else {
        g.used = false; // ✅ Marcar los que NO fueron usados
        nextGroups.push(g); // Y pasarlos como posibles implicantes
      }
    });

    // Eliminar duplicados en terminos combinados (0,1) (1,0)
    const uniqueGroups = []; // Arreglo con grupos
    const seen = new Set(); // Guardar combinaciones unicas
    for (const g of nextGroups) {
      const key = g.binary + "_" + g.minterms.join(","); // crear llave punica para identificar los grupos
      if (!seen.has(key)) {
        seen.add(key);
        uniqueGroups.push(g);
      }
    }

    // funciona para detener el bucle, ya que no se pueden seguir haciendo combinaciones
    if (uniqueGroups.length === currentGroups.length) break;

    allTables.push(uniqueGroups);
    currentGroups = uniqueGroups;
  }

  const primeImplicants = allTables.flat().filter((term) => !term.used);

  // Devolver array de objetos en base a la estructura que esta arribita
  return {
    tables: allTables,
    primeImplicants,
  };
};
