import * as z from "zod";

export const formSchema = z.object({
  city: z.string().min(0, {
    message: " cidade ou gps e preciso",
  }),
});
