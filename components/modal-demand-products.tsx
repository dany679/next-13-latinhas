"use client";
import { IDemand } from "@/app/(dashboard)/(demandas)/page";
import TableDemandProducts from "@/components/tables/table-demand-products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { BASE_HTTP } from "@/utils/constants";
import axios from "axios";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PaginationPros } from "../utils/types.d";
import PaginationControlled from "./pagination";
import { PopoverDemandProduct } from "./popover-demands-product";
import { Popover, PopoverTrigger } from "./ui/popover";

export interface IDemandProduct {
  id: number;
  productId: number;
  demandId: number;
  total_plan: number;
  total_prod: number;
  created_at: string;
  updated_at: string;
  Product: {
    name: string;
  };
}
export interface INewDemandProduct {
  productId: number;
  total_plan: number;
  name: string;
}
const ModalDemandProducts = ({
  open,
  setOpen,
  demand,
  handleCb,
}: {
  demand: IDemand;
  open: number | false;
  setOpen: (t: IDemand | false) => void;
  handleCb: () => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popover, setPopover] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<IDemandProduct[]>([]);

  const [pagination, setPagination] = useState<PaginationPros>({
    page: 0,
    count: 0,
    limit: 20,
  });
  const id = open;
  useEffect(() => {
    if (id) getDemandProducts();
    return () => {
      setData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page]);
  const getDemandProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_HTTP}/demands-products/${id}?page=${page || 1}&limit=5`
      );
      setData(data.demandsProducts);
      setPagination(data.pagination);
    } catch (error) {
      toast.error("Erro ao carregar os produtos");
    }
  };

  const handleCreateDemandProduct = async (
    demandaNewProduct: INewDemandProduct
  ) => {
    try {
      const req = await axios.post(`${BASE_HTTP}/demands-products`, {
        productId: demandaNewProduct.productId,
        demandId: demand.id,
        total_plan: demandaNewProduct.total_plan,
      });
      setPopover(false);
      setData([
        ...data,
        { ...req.data, Product: { name: demandaNewProduct.name || "" } },
      ]);
      toast.success("adicionado com sucesso");
    } catch (error) {
      toast.error("Erro ao adicionar");
    }
  };

  return (
    <Dialog
      open={!!open}
      onOpenChange={() => {
        setOpen(false);
        handleCb();
      }}
    >
      <DialogContent className="sm:min-w-[90vw] lg:min-w-[820px]">
        <DialogHeader>
          <DialogTitle className="flex  items-center gap-x-2 font-bold py-6">
            <div className="flex flex-col">
              <h5
                className={cn("pb-2 text-orangePrimary-800")}
              >{`Demanda ${id}`}</h5>
              <div className="text-foreground-muted text-gray-500 text-sm lg:text-md  ">
                {`${format(new Date(demand.start_at), "P")}`} -{" "}
                {`${format(new Date(demand.finish_at), "P")}`}
              </div>
            </div>
          </DialogTitle>
          <TableDemandProducts
            data={data}
            id={demand.id}
            handleCb={() => {
              setIsSubmitting(false);
              getDemandProducts();
            }}
            isSubmitting={isSubmitting}
          />
        </DialogHeader>
        <DialogFooter className=" flex flex-row  justify-self-start w-full ">
          <Popover open={popover}>
            <PopoverTrigger asChild>
              <Button
                disabled={isSubmitting}
                size="lg"
                variant="principal"
                onClick={() => setPopover(true)}
              >
                <Plus className="w-4 h-4 mr-2 fill-white" /> Adicionar
              </Button>
            </PopoverTrigger>
            <PopoverDemandProduct
              handleClose={() => setPopover(false)}
              id={demand.id}
              handleSubmit={(data) => handleCreateDemandProduct(data)}
            />
          </Popover>

          <PaginationControlled
            setPage={setPage}
            page={pagination?.page}
            limit={pagination?.limit}
            count={pagination.count}
          />
          <Button
            disabled={isSubmitting}
            size="lg"
            variant="principal"
            onClick={() => setIsSubmitting(true)}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDemandProducts;
