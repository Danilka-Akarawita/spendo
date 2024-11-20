-- DropForeignKey
ALTER TABLE `expenses` DROP FOREIGN KEY `Expenses_budgetId_fkey`;

-- AddForeignKey
ALTER TABLE `Expenses` ADD CONSTRAINT `Expenses_budgetId_fkey` FOREIGN KEY (`budgetId`) REFERENCES `Budget`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
