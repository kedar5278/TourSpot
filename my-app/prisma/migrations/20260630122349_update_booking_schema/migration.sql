-- CreateTable
CREATE TABLE `Booking` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `packageSlug` VARCHAR(191) NOT NULL,
    `travelDate` DATETIME(3) NOT NULL,
    `guests` INTEGER NOT NULL,
    `totalAmount` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Confirmed',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cancelledAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
