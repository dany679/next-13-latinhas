"use client";
import { IDemandProduct } from "@/components/modal-demand-products";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { BASE_HTTP } from "@/utils/constants";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TableDemandRoot from "./table-demand-root";
interface TableProductsProps {
  data: IDemandProduct[];
  handleCb: () => void;
  isSubmitting: boolean;
  id: number;
}
interface IDemandProductUpset extends IDemandProduct {
  id: any;
}
const TableDemandProducts = ({
  id,
  data,
  handleCb,
  isSubmitting,
}: TableProductsProps) => {
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<Partial<IDemandProductUpset>[]>(
    []
  );

  const handleDeleteDemandProduct = async (id: number) => {
    const exist =
      id && idsToDelete && idsToDelete.length > 0
        ? idsToDelete.find((element, index) => element === id)
        : -1;

    setIdsToDelete((old) => {
      if (typeof exist === "number" && exist >= 0) {
        return old.filter((ids) => ids !== id);
      } else {
        return [...old, id];
      }
    });
  };

  const handleSave = async () => {
    try {
      if (isSend) return;
      setIsSend(true);
      const req = await axios.put(`${BASE_HTTP}/demands-products/${id}`, {
        idsToDelete,
        demandsProducts: updateData,
      });

      toast.success("demanda atualizada com sucesso");
      handleCb();
    } catch (error) {
      toast.error("Erro ao atualizar demanda");
    } finally {
      setIsSend(false);
    }
  };
  useEffect(() => {
    if (isSubmitting) {
      handleSave();
    }
    return () => {
      setUpdateData([]);
      setIdsToDelete([]);
    };
  }, [id, isSubmitting]);

  const handleUpdate = (event: any, index: number) => {
    const target = event.target;
    const { name, value, id } = target;

    setUpdateData((old) => {
      const foundIdx =
        id && updateData && updateData.length > 0
          ? updateData.findIndex((element, index) => element.id == id)
          : false;
      let toUpdate = foundIdx && foundIdx >= 0 ? old[foundIdx] : data[index];
      toUpdate = { ...toUpdate, [name]: value, id: Number(id) };
      if (typeof foundIdx === "number" && foundIdx > -1)
        old.splice(foundIdx, 1, toUpdate);
      else old.push(toUpdate);
      return old;
    });
  };
  return (
    <div className="space-y-2">
      <TableDemandRoot>
        {data &&
          data.length > 0 &&
          data.map((demand_products, index) => (
            <TableRow
              key={demand_products.id}
              className={cn(
                "cursor-pointer hover:bg-slate-200",
                `${
                  idsToDelete &&
                  idsToDelete.length > 0 &&
                  idsToDelete.includes(demand_products.id)
                    ? "bg-red-300"
                    : ""
                }`
              )}
            >
              <TableCell className="font-medium ">
                {demand_products.id}
              </TableCell>

              <TableCell>{demand_products.Product.name || ""}</TableCell>
              <TableCell>
                <Input
                  disabled={isSubmitting}
                  min={0}
                  className="border-transparent"
                  name="total_plan"
                  id={`${demand_products.id}`}
                  type="number"
                  defaultValue={demand_products.total_plan}
                  onChange={(value) => handleUpdate(value, index)}
                />
              </TableCell>
              <TableCell>
                <Input
                  disabled={isSubmitting}
                  min={0}
                  className="border-transparent"
                  name="total_prod"
                  id={`${demand_products.id}`}
                  type="number"
                  defaultValue={demand_products.total_prod}
                  onChange={(value) => handleUpdate(value, index)}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex align-bottom justify-end">
                  <Trash2
                    className="text-right"
                    onClick={() =>
                      handleDeleteDemandProduct(demand_products.id)
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableDemandRoot>
    </div>
  );
};

export default TableDemandProducts;
