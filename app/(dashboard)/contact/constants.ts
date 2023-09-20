import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(3, {
    message: " name e obrigatorio",
  }),
  email: z.string().min(1, {
    message: " email e obrigatorio",
  }),
  information: z.string().min(1, {
    message: " information e obrigatorio",
  }),
  file: z
    .any()
    .refine((file) => file.substr(file.length - 3) === "pdf", "Only .pdf"),
});
