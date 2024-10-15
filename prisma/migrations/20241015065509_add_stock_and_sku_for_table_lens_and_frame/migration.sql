/*
  Warnings:

  - You are about to alter the column `price` on the `frames` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `price` on the `lenses` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "frames" ADD COLUMN     "material" TEXT,
ADD COLUMN     "sku" TEXT,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "lenses" ADD COLUMN     "sku" TEXT,
ADD COLUMN     "stock" INTEGER,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
