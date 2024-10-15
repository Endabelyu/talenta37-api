import prismaClient from "../libs/prismaClients";

export const getRoles = async (userId: string) => {
  try {
    const user = await prismaClient.role.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    if (!user) {
      throw new Error("Roles not found!");
    }

    return {
      user,
    };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};

export const getFrames = async (userId: string) => {
  console.info(userId);
  try {
    const user = await prismaClient.frame.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        brand: true,
        material: true,
        imageURL: true,
        description: true,
        stock: true,
        sku: true,
      },
    });

    if (!user) {
      throw new Error("Frames not found!");
    }

    return {
      user,
    };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};

export const getLenses = async (userId: string) => {
  console.info(userId);
  try {
    const user = await prismaClient.lens.findMany({
      select: {
        id: true,
        name: true,
        brand: true,
        price: true,
        type: true,
        material: true,
        stock: true,
        sku: true,
      },
    });

    if (!user) {
      throw new Error("Lenses not found!");
    }

    return {
      user,
    };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};
