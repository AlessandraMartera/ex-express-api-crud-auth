/*
  Warnings:

  - You are about to drop the column `usdername` on the `users` table. All the data in the column will be lost.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `usdername`,
    ADD COLUMN `username` VARCHAR(32) NOT NULL;
