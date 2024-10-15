import prismaClient from "../src/libs/prismaClients";
import { frames } from "./data/frame";
import { lenses } from "./data/lens";
import { roles } from "./data/role";

async function main() {
  for (const frame of frames) {
    const newFrameResult = await prismaClient.frame.upsert({
      where: { name: frame.name },
      update: frame,
      create: frame,
    });
    console.info(`🆕 Product: ${newFrameResult.name}`);
  }
  for (const role of roles) {
    const newRoleResult = await prismaClient.role.upsert({
      where: { name: role.name },
      update: role,
      create: role,
    });
    console.info(`🆕 Product: ${newRoleResult.name}`);
  }
  for (const lens of lenses) {
    const newLensResult = await prismaClient.lens.upsert({
      where: { name: lens.name },
      update: lens,
      create: lens,
    });
    console.info(`🆕 Product: ${newLensResult.name}`);
  }
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
