"use client";

import { Heading } from "@/components/Heading";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { formSchema } from "./constants";
const CodePage = () => {
  const router = useRouter();
  const page = toolsObjects.contact;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      information: "",
      email: "",
      file: "",
    },
  });
  const [data, setData] = useState<z.infer<typeof formSchema>>();

  const isSubmitting = form.formState.isSubmitting;

  const onSubmitting = async (values: z.infer<typeof formSchema>) => {
    try {
      setData(values);
      console.log(values);
      form.reset();
      toast.success("verifique o console.log()");
      return null;
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
              name="file"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6 ">
                  <FormLabel>PDF</FormLabel>
                  <FormControl className="cursor-pointer">
                    <Input
                      id="file"
                      // name="file"
                      type="file"
                      accept="application/pdf"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Danielly" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="daniellymoreira30@gmail.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="information"
              render={({ field }) => (
                <FormItem className="col-span-10 lg:col-span-10">
                  <FormLabel>Digite aqui sua duvida</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Gostaria de contratar sua empresa acima segue um pdf de teste"
                      {...field}
                    />
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
              {isSubmitting ? "...Enviar" : " Enviar"}
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
        {data && <Empty label={"verifique seu console.log()"} />}

        {!data && !isSubmitting && <Empty label={"Nenhuma consulta ativa"} />}
      </div>
    </div>
  );
};

export default CodePage;
