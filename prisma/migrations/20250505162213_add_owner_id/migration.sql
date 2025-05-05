/*
  Warnings:

  - Added the required column `ownerId` to the `tables` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tables" ADD COLUMN     "ownerId" TEXT NOT NULL;
