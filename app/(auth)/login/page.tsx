"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
// import { useToast } from "@/components/ui/use-toast";
// import { ToastAction } from "@/components/ui/toast";
import { signIn } from "next-auth/react";

import { Heading } from "@/components/Heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginToProvider = async () => {
    try {
      const user = await signIn("github", { callbackUrl: "/" });
      console.log(user);
    } catch (error) {}
  };
  const onSubmitting = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signIn<"credentials">("credentials", {
        ...values,
        redirect: false,
      });

      const response = await request.data;

      console.log("USER REGISTER FORM", res);
      console.log("GOOOO");
      router.push("/");

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
      //  router.push("/");
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
      password: "",
      email: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className={cn("flex flex-col w-full m-10 max-w-md gap-4")}>
      <Heading.title
        title="Login"
        description="Crie sua conta ou faca login com o github"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitting)}
          className="grid gap-2 "
        >
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
            variant="dark"
            type="submit"
            disabled={isSubmitting}
            className="col-span-12  w-full  mt-auto mb-auto "
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
      <Button
        onClick={() => handleLoginToProvider()}
        variant="dark"
        type="button"
        disabled={isSubmitting}
        className="mr-2 h-10 w-full  "
      >
        {isSubmitting ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
