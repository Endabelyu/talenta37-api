import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new OpenAPIHono();
import { apiReference } from "@scalar/hono-api-reference";
app.get("/", (c) => {
  return c.text("Hello This is Talenta 37 API!");
});
app.use("*", logger());
app.use("*", cors());

app.notFound((c) => {
  return c.text("Sorry, the page you are looking for does not exist.", 404);
});
app.onError((err, c) => {
  return c.text(
    "Oops! Something went wrong on our end. Please try again later.",
    500,
  );
});

app.get(
  "/api",
  apiReference({
    spec: {
      url: "/doc",
    },
  }),
);
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Talenta 37 API",
    description:
      "Talenta 37 API a RESTful service that provides access to detailed data for Talenta 37 web apps.",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
});

// // API ROUTES
// app.route("/products", productRoute);
// app.route("/users", userRoute);
// app.route("/auth", authRoute);
// app.route("/carts", cartRoute);
// app.route("/orders", orderRoute);

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};
