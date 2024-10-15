/*
  Warnings:

  - You are about to drop the column `frameId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `framePrice` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `lensId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `lensPrice` on the `orders` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `frame` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lens` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_frameId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_lensId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "frameId",
DROP COLUMN "framePrice",
DROP COLUMN "lensId",
DROP COLUMN "lensPrice",
ADD COLUMN     "frame" TEXT NOT NULL,
ADD COLUMN     "lens" TEXT NOT NULL,
ALTER COLUMN "rightEyeSph" SET DATA TYPE TEXT,
ALTER COLUMN "rightEyeCyl" SET DATA TYPE TEXT,
ALTER COLUMN "rightEyeAdd" SET DATA TYPE TEXT,
ALTER COLUMN "leftEyeSph" SET DATA TYPE TEXT,
ALTER COLUMN "leftEyeCyl" SET DATA TYPE TEXT,
ALTER COLUMN "leftEyeAdd" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
