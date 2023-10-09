import { IDemand } from "@/app/(dashboard)/(demandas)/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { BASE_HTTP } from "@/utils/constants";
import { STATUS_DEMAND } from "@/utils/enum";
import axios from "axios";
import { format } from "date-fns";
import { Pencil, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface TableProductsProps {
  data?: IDemand[];
  handleCb: () => void;
  handleUpdate: (demand: false | IDemand) => void;
  update: number | undefined;
  handleEditDemand: (demand: IDemand) => void;
}

const TableDemands = ({
  data,
  handleCb,
  handleUpdate,
  update,
  handleEditDemand,
}: TableProductsProps) => {
  const handleDeleteDemand = async (id: number) => {
    try {
      const req = await axios.delete(`${BASE_HTTP}/demand/${id}`);
      toast.success("demanda detetada com sucesso");
      handleCb();
    } catch (error) {
      toast.error(
        "Erro ao detetar o demanda verifique se há conexão com internet"
      );
    }
  };

  return (
    <div className="flex flex-col ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Edit</TableHead>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Data Inicial</TableHead>
            <TableHead>Data Final</TableHead>
            <TableHead>SKUS</TableHead>
            <TableHead>Total Plan</TableHead>
            <TableHead>Total Prod</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Deletar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.length > 0 &&
            data.map((demand) => (
              <TableRow
                key={demand.id}
                className={cn(
                  "cursor-pointer hover:bg-slate-200",
                  `${update && update == demand.id ? "bg-orange-200" : ""}`
                )}
              >
                <TableCell
                  className=""
                  onClick={() => handleEditDemand(demand)}
                >
                  <div className="flex align-bottom justify-start">
                    {update && update == demand.id ? (
                      <PencilLine className="text-white" />
                    ) : (
                      <Pencil className=" " />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium ">{demand.id}</TableCell>
                <TableCell onClick={() => handleUpdate(demand)}>
                  {format(new Date(demand.start_at), "P")}
                </TableCell>
                <TableCell onClick={() => handleUpdate(demand)}>
                  {format(new Date(demand.finish_at), "P")}
                </TableCell>
                <TableCell onClick={() => handleUpdate(demand)}>
                  {demand._count.DemandsProducts || "0"}
                </TableCell>

                <TableCell onClick={() => handleUpdate(demand)}>
                  {demand.DemandsProducts.reduce(function (acc, obj) {
                    return acc + obj.total_plan;
                  }, 0)}
                </TableCell>
                <TableCell onClick={() => handleUpdate(demand)}>
                  {demand.DemandsProducts.reduce(function (acc, obj) {
                    return acc + obj.total_prod;
                  }, 0)}
                </TableCell>
                <TableCell
                  className={cn(
                    "cursor-pointer ",
                    `${
                      demand.status === STATUS_DEMAND.PLANEJAMENTO
                        ? "bg-red-200 "
                        : demand.status == STATUS_DEMAND["ANDAMENTO"]
                        ? "bg-blue-200"
                        : "bg-green-200"
                    }`
                  )}
                >
                  {demand.status}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex align-bottom justify-end">
                    <Trash2
                      className="text-right"
                      onClick={() => handleDeleteDemand(demand.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDemands;
