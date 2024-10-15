import { OpenAPIHono, z } from "@hono/zod-openapi";
import { checkUserToken } from "../middlewares/check-user-token";
import { orderPayload } from "../schemas/order-schema";
import { createOrder } from "../services/order.service";
import { Context } from "hono";

const API_TAGS = ["Order"];
export const orderRoute = new OpenAPIHono();
orderRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  },
);
// Create order
orderRoute.openapi(
  {
    method: "post",
    path: "/create",
    middleware: checkUserToken,
    security: [{ AuthorizationBearer: [] }],
    summary: "Create Order",
    request: {
      body: {
        content: {
          "application/json": {
            schema: orderPayload,
          },
        },
      },
    },

    responses: {
      201: {
        description: "Create order successfully",
        content: {
          "application/json": {
            schema: z.object({
              ok: z.boolean().default(true),
              message: z.string(),
              data: z
                .object({
                  id: z.string(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                })
                .extend({
                  orderPayload,
                }),
            }),
          },
        },
      },
      400: {
        description: "Create order Failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    try {
      const users = c.get("user");
      const body = await c.req.json();
      console.log(body);
      const { order } = await createOrder(body, users.id);
      return c.json(
        {
          ok: true,
          message: "Create order successfully",
          data: order,
        },
        201,
      );
    } catch (error: Error | any) {
      console.error(error);
      return c.json(
        {
          ok: false,
          message: error.message || "Create order failed!",
        },
        400,
      );
    }
  },
);
