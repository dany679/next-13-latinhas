"use client";

import { Heading } from "@/components/Heading";
import ModalDemandProducts from "@/components/modal-demand-products";
import PaginationControlled from "@/components/pagination";
import TableDemands from "@/components/tables/table-demands";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { cn } from "@/lib/utils";
import { BASE_HTTP, toolsObjects } from "@/utils/constants";
import { STATUS_DEMAND } from "@/utils/enum";
import { PaginationPros } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { formSchema, status } from "./constants";

const page = toolsObjects.demands;

export interface IDemand {
  id: number;
  start_at: Date;
  finish_at: Date;
  status: STATUS_DEMAND;
  DemandsProducts:
    | {
        total_plan: number;
        total_prod: number;
      }[]
    | [];
  _count: {
    DemandsProducts: number;
  };
}
[];

export default function DemandasPage() {
  const session = useSession();
  console.log(session.data?.user);
  const axiosAuth = useAxiosAuth();
  console.log(axiosAuth);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [data, setData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [update, setUpdate] = useState<undefined | number>(undefined);
  const initialPagination = { count: 0, page: 1, limit: 10 };
  const [pagination, setPagination] =
    useState<PaginationPros>(initialPagination);
  const [open, setOpen] = useState<false | IDemand>(false);
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    getDemands();
    return () => {
      setData(undefined);
      setOpen(false);
      setPagination(initialPagination);
      setUpdate(undefined);
    };
  }, [pageNumber]);

  const onSubmitting = async (values: z.infer<typeof formSchema>) => {
    try {
      update
        ? await axiosAuth.put(`${BASE_HTTP}/demand/${values.id}`, {
            start_at: values.start_at,
            finish_at: values.finish_at,
            status: values.status,
          })
        : await axios.post(`${BASE_HTTP}/demand`, {
            start_at: values.start_at,
            finish_at: values.finish_at,
            status: "EM ANDAMENTO",
          });
      form.reset();
      toast.success(
        `demanda ${update ? "atualizada" : "cadastrada"} com sucesso`
      );
      getDemands();
    } catch (error: any) {
      toast.error(`erro ao ${update ? "atualizar" : "cadastrar"} demanda`);
    } finally {
      router.refresh();
      setUpdate(undefined);
    }
  };

  const getDemands = async () => {
    try {
      const { data } = await axiosAuth.get(
        `/demand?page=${pageNumber}&limit=${pagination.limit}`
      );
      setPagination(data.pagination);
      setData(data.demands);
    } catch (error) {
      toast.error("Erro ao carregar os demandas");
    }
  };
  const formEdit = async (demand: IDemand) => {
    console.log("demand");
    if (demand.id == form.getValues("id")) {
      setUpdate(undefined);
      form.reset();
      return;
    }
    form.setValue("id", demand.id);
    form.setValue("finish_at", new Date(demand.finish_at));
    form.setValue("start_at", new Date(demand.start_at));
    form.setValue("status", demand.status);
    setUpdate(demand.id);
  };

  return (
    <div className="flex flex-col  items-stretch bg-grey-lighter min-h-[90vh]">
      <Heading.root>
        <Heading.icon
          Icon={page.icon}
          iconColor={page.color}
          bgColor={page.color}
        />
        <Heading.title
          title={page.label + " De Produção"}
          description="Crie edit ou exclua sua demanda"
          color={page.colorDark}
        />
      </Heading.root>
      <div className="px-4 lg:px-8">
        {open && (
          <ModalDemandProducts
            handleCb={() => getDemands()}
            setOpen={setOpen}
            open={open && open.id ? open.id : false}
            demand={open}
          />
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitting)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              control={form.control}
              name="start_at"
              render={({ field }) => (
                <FormItem className="col-span-12  md:col-span-6 lg:col-span-3 xl:col-span-4 ">
                  <FormLabel className="flex w-full pb-2">
                    Data inicial
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "P")
                          ) : (
                            <span>Data Inicial</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=" p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          if (
                            date &&
                            form.getValues("finish_at") &&
                            date > form.getValues("finish_at")
                          ) {
                            form.setValue("finish_at", addDays(date, 14));
                            field.onChange(date);
                          }
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2000-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Data inicial precisa ser menor que a final
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="finish_at"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6 lg:col-span-3 ">
                  <FormLabel className="flex w-full pb-2">Data Final</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full  pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "P")
                          ) : (
                            <span>Data Final</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          !form.getValues("start_at") ||
                          date < form.getValues("start_at")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {!form.getValues("start_at")
                      ? " Adicione a data inicial primeiro"
                      : !form.getValues("finish_at")
                      ? "Adicione a data final"
                      : "Data final adicionada"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem
                  className={cn(
                    "col-span-6  md:col-span-6  lg:col-span-3   mt-auto mb-auto lg:mt-0",
                    form.getValues("id") ? "" : "hidden"
                  )}
                >
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {status.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status || ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>modifique o status</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              className={cn(
                " w-full  mt-auto mb-auto ",
                update
                  ? "col-span-6  lg:col-span-2 "
                  : "col-span-12  lg:col-span-4 "
              )}
            >
              <Button
                type="submit"
                className={cn(
                  " w-full  mt-auto mb-auto lg:mt-0 lg:mb-1",
                  update
                    ? "col-span-6  lg:col-span-2 "
                    : "col-span-12  lg:col-span-4 "
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : ""} {update ? " Atualizar" : " Criar"}
              </Button>
            </div>
          </form>
        </Form>
        <TableDemands
          handleEditDemand={(demand) => {
            formEdit(demand);
          }}
          update={update}
          data={data}
          handleCb={getDemands}
          handleUpdate={(demand) => {
            setOpen(demand);
          }}
        />
      </div>
      <div className="flex  mt-auto">
        <PaginationControlled
          page={pagination.page}
          count={pagination.count}
          limit={pagination.limit}
          setPage={setPageNumber}
        />
      </div>
    </div>
  );
}
