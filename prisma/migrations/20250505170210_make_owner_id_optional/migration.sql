-- DropForeignKey
ALTER TABLE "tables" DROP CONSTRAINT "tables_ownerId_fkey";

-- AlterTable
ALTER TABLE "tables" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;
