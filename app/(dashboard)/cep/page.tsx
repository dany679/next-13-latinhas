"use client";

import { Heading } from "@/components/Heading";
import CepDetails from "@/components/cep-details";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toolsObjects } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { formSchema } from "./constants";
const CodePage = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const page = toolsObjects.location;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      street: "",
      uf: "",
    },
  });

  const handleCleanData = () => {
    setData(null);
  };
  const isSubmitting = form.formState.isSubmitting;

  const onSubmitting = async (values: z.infer<typeof formSchema>) => {
    try {
      setData(null);
      const req = await axios.get(
        `https://viacep.com.br/ws/${values?.uf}/${values?.city}/${values?.street}/json/`
      );
      console.log(req);
      setData(req.data);
      form.reset();
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      router.refresh();
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
          description="Descubra o cep"
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
              name="uf"
              render={({ field }) => (
                <FormItem className="col-span-2 lg:col-span-2">
                  <FormLabel>UF</FormLabel>
                  <FormControl>
                    <Input placeholder="MG" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-10 lg:col-span-10 ">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Pirapora" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="col-span-10 lg:col-span-10">
                  <FormLabel>Rua/Avenida</FormLabel>
                  <FormControl>
                    <Input placeholder="Comandate" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="col-span-12 lg:col-span-2 w-full  mt-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "...Procurar" : " Procurar"}
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
        {data && <CepDetails data={data} handleCloseButton={handleCleanData} />}

        {!data && !isSubmitting && <Empty label={"Nenhuma consulta ativa"} />}
        <div className="flex flex-col-reverse gap-y-4 "></div>
      </div>
    </div>
  );
};

export default CodePage;
