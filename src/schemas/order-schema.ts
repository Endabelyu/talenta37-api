import { z } from "@hono/zod-openapi";

export const orderPayload = z.object({
  customerName: z
    .string()
    .min(4)
    .max(100)
    .openapi({ example: "Customer Name" }), // Required frame
  customerPhone: z.string().min(4).max(100).openapi({ example: "081313131" }), // Required frame
  frame: z.string().min(4).max(100).openapi({ example: "Plastic Black" }), // Required frame
  lens: z.string().min(4).max(100).openapi({ example: "Plastic Black" }),
  price: z.number().min(1).openapi({ example: 100000 }),
  rightEyeSph: z.string().min(1).max(10).openapi({ example: "-2.50" }),
  leftEyeSph: z.string().min(1).max(10).openapi({ example: "-1.50" }),
  rightEyeCyl: z.string().optional(),
  rightEyeAxis: z.number().optional(),
  rightEyeAdd: z.string().optional(),
  leftEyeCyl: z.string().optional(),
  leftEyeAxis: z.number().optional(),
  leftEyeAdd: z.string().optional(),
});
