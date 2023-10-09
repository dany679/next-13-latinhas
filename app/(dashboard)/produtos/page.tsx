"use client";

import { Heading } from "@/components/Heading";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import TableProducts from "@/components/tables/table-products";
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
import { Input } from "@/components/ui/input";
import { BASE_HTTP, toolsObjects } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { formSchema } from "./constants";
const ProdutosPage = () => {
  const router = useRouter();
  const page = toolsObjects.products;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const [data, setData] = useState();
  const [update, setUpdate] = useState<undefined | number>(undefined);
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    getProduct();
    return () => {
      setData(undefined);
    };
  }, []);

  const onSubmitting = async (values: z.infer<typeof formSchema>) => {
    try {
      const req =
        update && update > 0
          ? await axios.put(`${BASE_HTTP}/product/${values.id}`, {
              name: values.name,
            })
          : await axios.post(`${BASE_HTTP}/product`, {
              name: values.name,
            });
      form.reset();
      toast.success(
        `produto ${update ? "atualizado" : "cadastrado"} com sucesso`
      );
      getProduct();
    } catch (error: any) {
      toast.error(`erro ao ${update ? "atualizar" : "cadastrar"} produto`);
    } finally {
      // router.refresh();
    }
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${BASE_HTTP}/product`);
      setData(data);
    } catch (error) {
      toast.error("Erro ao carregar os produtos");
    }
  };

  return (
    <div>
      <Heading.root>
        <Heading.icon
          Icon={page.icon}
          iconColor={page.color}
          bgColor={page.color}
        />
        <Heading.title
          title={page.label}
          description="Crie edit ou exclua seu produto"
          color={page.colorDark}
        />
      </Heading.root>
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitting)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-10 ">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Lata azul" {...field} />
                  </FormControl>
                  <FormDescription>Cadastre o produto</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="col-span-12 lg:col-span-2 w-full  mt-auto mb-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "...Criar" : " Criar"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4 px-4 lg:px-8 ">
        {isSubmitting && (
          <>
            <div className="p-8 rounded-lg w-full flex item-center justify-center bg-muted">
              <Loader />
            </div>
          </>
        )}
        <TableProducts
          data={data}
          handleCb={() => getProduct()}
          update={update}
          handleUpdate={(product) => {
            const value =
              product && product.id !== form.getValues("id")
                ? product
                : {
                    id: 0,
                    name: "",
                  };
            form.setValue("name", value.name);
            form.setValue("id", value.id);
            setUpdate(value.id);
          }}
        />
        {!data && !isSubmitting && (
          <Empty label={"Nenhum Produto cadastrado"} />
        )}
      </div>
    </div>
  );
};

export default ProdutosPage;
