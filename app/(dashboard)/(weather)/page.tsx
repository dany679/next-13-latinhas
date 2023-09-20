"use client";

import { Heading } from "@/components/Heading";
import CardWeatherDetails from "@/components/card-weather-details";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
  const [location, setLocation] = useState<string | null>(null);

  const page = toolsObjects.wealth;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
    },
  });

  const handleCleanData = () => {
    setData(null);
  };
  const handleFindLocalization = () => {
    navigator.geolocation.getCurrentPosition(function (posicao) {
      setLocation(`${posicao.coords.latitude},${posicao.coords.longitude}`);
      onSubmitting();
    });
  };

  const isSubmitting = form.formState.isSubmitting;
  console.log(process.env.NEXT_API_KEY);
  const onSubmitting = async (values?: z.infer<typeof formSchema>) => {
    try {
      const where =
        values && values.city && values.city !== "" && values.city.trim() !== ""
          ? values.city
          : location;

      const req = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=181c480489154c52b10184415231809&q=${where}&days=7&aqi=yes&alerts=yes`
      );
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
          description="Descubra como sera seu dia"
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
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-8">
                  <FormControl className="m-0 p-0">
                    <Input
                      required
                      {...field}
                      className="border-0 outline-none focus-visible:ring-0  focus-visible:ring-transparent "
                      disabled={isSubmitting}
                      placeholder="digite sua cidade ou procure usando o gps"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="button"
              className="col-span-6 lg:col-span-2 w-full"
              disabled={isSubmitting}
              onClick={handleFindLocalization}
            >
              Gps
            </Button>
            <Button
              type="submit"
              className="col-span-6 lg:col-span-2 w-full"
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
        {data && (
          <CardWeatherDetails data={data} handleCloseButton={handleCleanData} />
        )}

        {!data && !isSubmitting && <Empty label={"Nenhuma consulta ativa"} />}
        <div className="flex flex-col-reverse gap-y-4 "></div>
      </div>
    </div>
  );
};

export default CodePage;
