/*
  Warnings:

  - A unique constraint covering the columns `[bookingRef]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingRef` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageImage` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Booking` ADD COLUMN `bookingRef` VARCHAR(191) NOT NULL,
    ADD COLUMN `duration` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `packageImage` VARCHAR(191) NOT NULL,
    ADD COLUMN `packageName` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'confirmed';

-- CreateIndex
CREATE UNIQUE INDEX `Booking_bookingRef_key` ON `Booking`(`bookingRef`);
