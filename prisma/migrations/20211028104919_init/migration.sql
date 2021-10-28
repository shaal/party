/*
  Warnings:

  - Made the column `postId` on table `nfts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `nfts` MODIFY `postId` VARCHAR(191) NOT NULL;
