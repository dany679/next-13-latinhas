import { STATUS_DEMAND_AS_CONST } from "@/utils/enum";
import * as z from "zod";
export const status = ["EM ANDAMENTO", "PLANEJAMENTO", "CONCLUIDO"];

export const formSchema = z.object({
  start_at: z.date({
    required_error: "data inicial e obrigatoria",
  }),
  finish_at: z.date({
    required_error: "data final e obrigatoria",
  }),
  id: z
    .number()
    .min(1, {
      message: " id obrigatorio",
    })
    .optional(),
  status: z.enum(STATUS_DEMAND_AS_CONST).optional(),
});
