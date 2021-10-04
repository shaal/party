/*
  Warnings:

  - You are about to alter the column `index` on the `poll_answers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `poll_answers` MODIFY `index` INTEGER NOT NULL;
