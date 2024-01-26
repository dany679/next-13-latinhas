import * as z from "zod";

export const formSchema = z.object({
  email: z.string().email().min(7, {
    message: " email obrigatorio",
  }),
  password: z.string().min(6, {
    message: "senha minimo de 6 digitos",
  }),
});
