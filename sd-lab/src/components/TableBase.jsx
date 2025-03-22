import { quineMcCluskey } from "./utils/quineMcclasky";
import { TableGroup } from "./TableGroup";

export const TableBase = ({ variablesHead, binarySorted, mintermsSorted }) => {
  const { tables } = quineMcCluskey(binarySorted, mintermsSorted);

  return (
    <div className="space-y-10">
      {tables.map((table, idx) => (
        <TableGroup
          key={idx}
          index={idx}
          table={table}
          variablesHead={variablesHead}
        />
      ))}
    </div>
  );
};
