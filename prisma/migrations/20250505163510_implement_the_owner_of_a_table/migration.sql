/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `tables` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tables_ownerId_key" ON "tables"("ownerId");

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
