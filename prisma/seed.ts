import prismaClient from "../src/libs/prismaClients";
import { frames } from "./data/frame";

async function main() {
  for (const frame of frames) {
    const newFrameResult = await prismaClient.frame.upsert({
      where: { slug: frame.slug },
      update: frame,
      create: frame,
    });
    console.info(`🆕 Product: ${newFrameResult.name}`);
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
