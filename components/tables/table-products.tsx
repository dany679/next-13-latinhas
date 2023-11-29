"use client";

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
import axios from "axios";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Empty from "../empty";

interface IProduct {
  id: number;
  name: string;
}

interface TableProductsProps {
  data?: {
    id: number;
    name: string;
  }[];
  // handleCb: () => void;
  // handleUpdate?: (id: false | IProduct) => void;
  // update?: number;
}

const TableProducts = ({
  data,
}: // handleCb,
// handleUpdate,
// update,
TableProductsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = searchParams.get("id");
  const update = Number(id);
  const url = `${pathname}?${searchParams}`;

  const handleUpdate = (productId: number) => {
    const newUrl = id
      ? url.replace(`&id=${update}`, `&id=${productId}`)
      : url + `&id=${productId}`;
    console.log(newUrl, "NEW URL");
    router.push(`${newUrl}`, { scroll: false });
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const req = await axios.delete(`${BASE_HTTP}/product/${id}`);
      toast.success("Produto detetado com sucesso");
      router.refresh();
    } catch (error) {
      toast.error(
        "Erro ao detetar o produto verifique se há demandas feitas com o produto"
      );
    }
  };
  return (
    <div className="flex flex-col ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Deletar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.length > 0 &&
            data.map((product) => (
              <TableRow
                key={product.id}
                className={cn(
                  "cursor-pointer hover:bg-slate-200",
                  `${update && update === product.id ? "bg-orange-200" : ""}`
                )}
              >
                <TableCell className="font-medium ">{product.id}</TableCell>
                <TableCell onClick={() => handleUpdate(product.id)}>
                  {product.name}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex align-bottom justify-end">
                    <Trash2
                      className="text-right"
                      onClick={() => handleDeleteProduct(product.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {data && data.length === 0 && (
        <Empty label={"Nenhum Produto cadastrado"} />
      )}
    </div>
  );
};

export default TableProducts;
