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
import toast from "react-hot-toast";

interface IProduct {
  id: number;
  name: string;
}

interface TableProductsProps {
  data?: {
    id: number;
    name: string;
  }[];
  handleCb: () => void;
  handleUpdate: (id: false | IProduct) => void;
  update?: number;
}

const TableProducts = ({
  data,
  handleCb,
  handleUpdate,
  update,
}: TableProductsProps) => {
  const handleDeleteProduct = async (id: number) => {
    try {
      const req = await axios.delete(`${BASE_HTTP}/product/${id}`);
      toast.success("Produto detetado com sucesso");
      handleCb();
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
                <TableCell onClick={() => handleUpdate(product)}>
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
    </div>
  );
};

export default TableProducts;
