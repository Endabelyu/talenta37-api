// get profile
import { OpenAPIHono, z } from "@hono/zod-openapi";
import { getProfile } from "../services/auth.service";
import { Context } from "hono";
import { checkUserToken } from "../middlewares/check-user-token";
import { getFrames, getLenses, getRoles } from "../services/master.service";
const API_TAGS = ["Master"];
export const masterRoute = new OpenAPIHono();

masterRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  },
);

masterRoute.openapi(
  {
    method: "get",
    path: "/role",
    middleware: checkUserToken,
    security: [{ AuthorizationBearer: [] }],
    summary: "Get roles list",
    responses: {
      200: {
        description: "Get roles successfully",
      },
      400: {
        description: "Get roles Failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    try {
      const user = c.get("user");
      const { user: userData } = await getRoles(user.id as string);

      return c.json(
        {
          ok: true,
          message: "Get roles successfully",
          data: userData,
        },
        200,
      );
    } catch (error: Error | any) {
      console.info(error);
      return c.json(
        {
          ok: false,
          message: error.message || "Get roles failed!",
        },
        400,
      );
    }
  },
);
masterRoute.openapi(
  {
    method: "get",
    path: "/frame",
    middleware: checkUserToken,
    security: [{ AuthorizationBearer: [] }],
    summary: "Get frames list",
    responses: {
      200: {
        description: "Get frames successfully",
      },
      400: {
        description: "Get frames Failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    try {
      const user = c.get("user");
      const { user: userData } = await getFrames(user.id as string);

      return c.json(
        {
          ok: true,
          message: "Get frames successfully",
          data: userData,
        },
        200,
      );
    } catch (error: Error | any) {
      console.info(error);
      return c.json(
        {
          ok: false,
          message: error.message || "Get frames failed!",
        },
        400,
      );
    }
  },
);
masterRoute.openapi(
  {
    method: "get",
    path: "/lens",
    middleware: checkUserToken,
    security: [{ AuthorizationBearer: [] }],
    summary: "Get lenses list",
    responses: {
      200: {
        description: "Get lenses successfully",
      },
      400: {
        description: "Get lenses Failed",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    try {
      const user = c.get("user");
      const { user: userData } = await getLenses(user.id as string);

      return c.json(
        {
          ok: true,
          message: "Get lenses successfully",
          data: userData,
        },
        200,
      );
    } catch (error: Error | any) {
      console.info(error);
      return c.json(
        {
          ok: false,
          message: error.message || "Get lenses failed!",
        },
        400,
      );
    }
  },
);
