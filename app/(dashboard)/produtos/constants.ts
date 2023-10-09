import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(3, {
    message: " nome obrigatorio",
  }),
  id: z
    .number()
    .min(1, {
      message: " id obrigatorio",
    })
    .optional(),
});
