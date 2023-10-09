import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const TableDemandRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col ">
      <Table>
        <HeaderTable />
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
};

export default TableDemandRoot;

const HeaderTable = () => (
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">id</TableHead>
      <TableHead>Descrição</TableHead>
      <TableHead>Total Plan(Tons)</TableHead>
      <TableHead>Total Prod(Tons)</TableHead>
      <TableHead className="text-right">Remover</TableHead>
    </TableRow>
  </TableHeader>
);
