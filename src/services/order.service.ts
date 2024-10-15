import prismaClient from "../libs/prismaClients";
import { orderPayload } from "../schemas/order-schema";
import { z } from "@hono/zod-openapi";

export const createOrder = async (
  payload: z.infer<typeof orderPayload>,
  userId: string,
) => {
  try {
    console.info(payload, userId);
    const order = await prismaClient.order.create({
      data: {
        ...payload,
        userId, // userId is included in the payload
      },
    });
    return { order };
  } catch (error) {
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};
