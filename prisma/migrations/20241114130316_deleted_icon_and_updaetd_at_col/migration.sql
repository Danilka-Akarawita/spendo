/*
  Warnings:

  - You are about to drop the column `icon` on the `budget` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `budget` DROP COLUMN `icon`,
    DROP COLUMN `updatedAt`;
