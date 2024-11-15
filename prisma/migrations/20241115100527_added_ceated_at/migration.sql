/*
  Warnings:

  - You are about to drop the column `createdBy` on the `expenses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `expenses` DROP COLUMN `createdBy`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
