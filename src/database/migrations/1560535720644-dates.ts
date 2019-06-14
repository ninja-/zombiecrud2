/* tslint:disable */

import {MigrationInterface, QueryRunner} from "typeorm";

export class dates1560535720644 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.query("ALTER TABLE `pet` DROP FOREIGN KEY `fk_user_pet`");
        await queryRunner.query("ALTER TABLE `cache` DROP COLUMN `updated`");
        await queryRunner.query("ALTER TABLE `cache` ADD `updated` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `inventoryValuePLN`");
        await queryRunner.query("ALTER TABLE `zombie` ADD `inventoryValuePLN` decimal NOT NULL");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `inventoryValueUSD`");
        await queryRunner.query("ALTER TABLE `zombie` ADD `inventoryValueUSD` decimal NOT NULL");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `inventoryValueEUR`");
        await queryRunner.query("ALTER TABLE `zombie` ADD `inventoryValueEUR` decimal NOT NULL");
        // await queryRunner.query("ALTER TABLE `pet` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // await queryRunner.query("ALTER TABLE `pet` DROP FOREIGN KEY `FK_64704296b7bd17e90ca0a620a98`");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `inventoryValueEUR`");
        await queryRunner.query("ALTER TABLE `zombie` ADD `inventoryValueEUR` int NOT NULL");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `inventoryValueUSD`");
        await queryRunner.query("ALTER TABLE `zombie` ADD `inventoryValueUSD` int NOT NULL");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `inventoryValuePLN`");
        await queryRunner.query("ALTER TABLE `zombie` ADD `inventoryValuePLN` int NOT NULL");
        await queryRunner.query("ALTER TABLE `cache` DROP COLUMN `updated`");
        await queryRunner.query("ALTER TABLE `cache` ADD `updated` timestamp(6) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(6)'");
        // await queryRunner.query("ALTER TABLE `pet` ADD CONSTRAINT `fk_user_pet` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT");
    }

}
