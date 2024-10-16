import prismaClient from "../libs/prismaClients";
import { orderPayload } from "../schemas/order-schema";
import { z } from "@hono/zod-openapi";

export const createOrder = async (
  payload: z.infer<typeof orderPayload>,
  userId: string,
) => {
  try {
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

export const getOrders = async (userId: string) => {
  try {
    const orders = await prismaClient.order.findMany({
      select: {
        id: true,
        userId: true,
        rightEyeSph: true,
        rightEyeCyl: true,
        rightEyeAxis: true,
        rightEyeAdd: true,
        leftEyeSph: true,
        leftEyeCyl: true,
        leftEyeAxis: true,
        leftEyeAdd: true,
        frame: true,
        lens: true,
        price: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!orders) {
      throw new Error("Orders not found!");
    }

    return {
      orders,
    };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};

export const updateOrder = async (
  payload: z.infer<typeof orderPayload>,
  orderId: string,
) => {
  try {
    const order = await prismaClient.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new Error("Order not found!");
    }
    const updateOrder = await prismaClient.order.update({
      data: {
        ...payload,
      },
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });
    return { order: updateOrder };
  } catch (error) {
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};
