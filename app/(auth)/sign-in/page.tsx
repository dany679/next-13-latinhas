"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
// import { useToast } from "@/components/ui/use-toast";
// import { ToastAction } from "@/components/ui/toast";

import { Heading } from "@/components/Heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { BASE_HTTP } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "./constants";

// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
  name: string;
  email: string;
  password: string;
}

export default function UserRegisterForm() {
  //   const { toast } = useToast();

  // const router = useRouter();

  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitting = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      const request = await axios.post(`${BASE_HTTP}/user`, {
        ...values,
      });

      // const response = await request.data;

      console.log("USER REGISTER FORM", request);

      // if (!request.ok) {
      //   //   toast({
      //   //     title: "Oooops...",
      //   //     description: response.error,
      //   //     variant: "destructive",
      //   //     action: (
      //   //       <ToastAction altText="Tente Novamente">Tente Novamente</ToastAction>
      //   //     ),
      //   //   });
      // } else {
      //   console.log(response);
      //   router.push("/login");
      // }

      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 5000);
    } catch (error) {
    } finally {
      form.reset();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  return (
    <div
      className={cn("flex flex-col w-full m-10 max-w-md gap-4")}
      // {...props}
    >
      {/* {JSON.stringify(data)} */}
      <Heading.title title="Criar Conta" description="" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitting)}
          className="grid gap-2 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-12 ">
                <FormLabel className="sr-only" htmlFor="name">
                  Nome
                </FormLabel>
                <FormControl>
                  <Input placeholder="nome" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-12 ">
                <FormLabel className="sr-only" htmlFor="email">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@email.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-12 ">
                <FormLabel className="sr-only" htmlFor="password">
                  Password
                </FormLabel>
                <FormControl>
                  <Input placeholder="*****" {...field} type="password" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="col-span-12  w-full  mt-auto mb-auto"
          >
            {isSubmitting ? "...Enviar" : " Enviar"}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>
      {/* <Button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        variant="outline"
        type="button"
        disabled={isLoading}
        className="mr-2 h-8 w-full "
      >
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button> */}
    </div>
  );
}
