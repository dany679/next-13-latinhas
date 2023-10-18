"use client";
import ButtonClose from "@/components/button-close";
import Loader from "@/components/loader";
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
import { BASE_HTTP } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { formSchema } from "./constants";

const FormProducts = () => {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const pathname = usePathname();
  const url = `${pathname}?${searchParams}`;
  const [update, setUpdate] = useState<false | number>(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    const getProduct = async () => {
      try {
        console.log("START");
        console.log(id);
        if (!id || id <= 1) {
          return;
        }
        const { data } = await axios.get(`${BASE_HTTP}/product/${id}`);
        form.setValue("name", data.name);
        form.setValue("id", data.id);
        setUpdate(id);
      } catch (error) {
        toast.error("Erro ao carregar os produto");
      }
    };
    getProduct();
    return () => {
      form.reset();
      setUpdate(false);
    };
  }, [id, form]);

  const isSubmitting = form.formState.isSubmitting;
  const onSubmitting = async (values: z.infer<typeof formSchema>) => {
    try {
      const update = values.id;
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
      //   getProduct();
    } catch (error: any) {
      toast.error(`erro ao ${update ? "atualizar" : "cadastrar"} produto`);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="px-4 lg:px-8">
      <Form {...form}>
        <ButtonClose
          classNameButton="top-8"
          onClick={() => {
            if (!id) {
              form.reset();
              return;
            }
            const newUrl = url.replace(`&id=${update}`, "");
            router.push(`${newUrl}`, { scroll: false });
          }}
        />

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
            {isSubmitting ? "..." : ""}
            {form.getValues("id") == id ? "atualizar " : "criar"}
          </Button>
        </form>
      </Form>
      {isSubmitting && (
        <>
          <div className="p-8 rounded-lg w-full flex item-center justify-center bg-muted">
            <Loader />
          </div>
        </>
      )}
    </div>
  );
};

export default FormProducts;
