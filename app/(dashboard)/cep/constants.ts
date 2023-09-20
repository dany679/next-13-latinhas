import * as z from "zod";

export const formSchema = z.object({
  street: z.string().min(3, {
    message: " cidade e obrigatorio",
  }),
  city: z.string().min(1, {
    message: " city e obrigatorio",
  }),
  uf: z.string().min(2, {
    message: " uf e obrigatorio",
  }),
});
