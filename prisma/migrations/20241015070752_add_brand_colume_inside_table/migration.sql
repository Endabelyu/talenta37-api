/*
  Warnings:

  - Added the required column `brand` to the `lenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lenses" ADD COLUMN     "brand" TEXT NOT NULL;
