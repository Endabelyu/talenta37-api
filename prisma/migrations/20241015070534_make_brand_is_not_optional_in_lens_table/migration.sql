/*
  Warnings:

  - Made the column `price` on table `frames` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brand` on table `frames` required. This step will fail if there are existing NULL values in that column.
  - Made the column `material` on table `frames` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "frames" ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "brand" SET NOT NULL,
ALTER COLUMN "material" SET NOT NULL;
