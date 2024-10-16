import { OpenAPIHono, z } from "@hono/zod-openapi";
import { checkUserToken } from "../middlewares/check-user-token";
import { orderPayload } from "../schemas/order-schema";
import { createOrder, getOrders, updateOrder } from "../services/order.service";
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

// get order list
orderRoute.openapi(
  {
    method: "get",
    path: "/",
    middleware: checkUserToken,
    security: [{ AuthorizationBearer: [] }],
    summary: "Get order list ",
    responses: {
      200: {
        description: "Get order list successfully",
      },
      400: {
        description: "Get order list Failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    try {
      const user = c.get("user");
      const { orders } = await getOrders(user.id as string);

      return c.json(
        {
          ok: true,
          message: "Get order list successfully",
          data: orders,
        },
        200,
      );
    } catch (error: Error | any) {
      console.info(error);
      return c.json(
        {
          ok: false,
          message: error.message || "Get order list failed!",
        },
        400,
      );
    }
  },
);

// edit order
orderRoute.openapi(
  {
    method: "patch",
    path: "/create/{orderId}",
    middleware: checkUserToken,
    security: [{ AuthorizationBearer: [] }],
    summary: "Update Order",
    request: {
      params: z.object({
        orderId: z.string().min(1),
      }),
      body: {
        content: {
          "application/json": {
            schema: orderPayload.partial(),
          },
        },
      },
    },

    responses: {
      201: {
        description: "Update order successfully",
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
        description: "Update order Failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    try {
      const { orderId } = c.req.param();
      // const users = c.get("user");
      const body = await c.req.json();
      const { order } = await updateOrder(body, orderId);
      return c.json(
        {
          ok: true,
          message: "Update order successfully",
          data: order,
        },
        201,
      );
    } catch (error: Error | any) {
      console.error(error);
      return c.json(
        {
          ok: false,
          message: error.message || "Update order failed!",
        },
        400,
      );
    }
  },
);
