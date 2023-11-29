import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(3, {
    message: " nome obrigatorio",
  }),
  email: z.string().email().min(7, {
    message: " email obrigatorio",
  }),
  password: z.string().min(6, {
    message: "senha minimo de 6 digitos",
  }),
});
