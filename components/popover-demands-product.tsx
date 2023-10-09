"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  productId: z
    .string({
      required_error: "selecione um produto por favor.",
    })
    .min(1),
  total_plan: z
    .string({
      required_error: " selecione um planeamento por favor.",
    })
    .min(0, "Amount must be a positive number"),
});

import { PopoverContent } from "@/components/ui/popover";
import { BASE_HTTP } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonClose from "./button-close";
import { INewDemandProduct } from "./modal-demand-products";
import { Input } from "./ui/input";
interface IProduct {
  name: string;
  id: number;
}
interface IDemandProduct {
  total_plan: number;
  productId: number;
  name: string;
}
export function PopoverDemandProduct({
  id,
  handleSubmit,
  handleClose,
}: {
  id: number;
  handleSubmit: (produto: INewDemandProduct) => void;
  handleClose: () => void;
}) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      total_plan: "0",
      productId: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const productId: number = products[Number(data.productId)].id;
      const name: string = products[Number(data.productId)].name;
      const total_plan = Number(data.total_plan);
      if (total_plan <= 0) {
        return toast.error("Adicione um valor planeado");
      }
      handleSubmit({
        total_plan: total_plan > 0 ? total_plan : 1,
        productId,
        name,
      });
      form.reset();
    } catch (error) {}
  }

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${BASE_HTTP}/product`);
      setProducts(data);
    } catch (error) {
      toast.error("Erro ao carregar os produtos");
    }
  };
  useEffect(() => {
    getProducts();

    return () => {
      setProducts([]);
    };
  }, [id]);

  return (
    <PopoverContent className="w-80">
      <ButtonClose onClick={handleClose} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="total_plan"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel>Total Plan(Tons)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormDescription>Cadastre o produto</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o produto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products &&
                      products.length > 0 &&
                      products.map((product, index) => (
                        <SelectItem key={product.id} value={`${index}`}>
                          {product.name || ""}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription>Adicione o produto da demanda</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Adicionar</Button>
        </form>
      </Form>
    </PopoverContent>
  );
}
