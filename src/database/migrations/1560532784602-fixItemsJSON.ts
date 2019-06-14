/* tslint:disable */

import {MigrationInterface, QueryRunner} from "typeorm";

export class fixItemsJSON1560532784602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `zombie` ADD `inventoryValuePLN` int NOT NULL");
        await queryRunner.query("ALTER TABLE `zombie` ADD `inventoryValueUSD` int NOT NULL");
        await queryRunner.query("ALTER TABLE `zombie` ADD `inventoryValueEUR` int NOT NULL");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `itemsJSON`");
        await queryRunner.query("ALTER TABLE `zombie` ADD `itemsJSON` varchar(9999) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `itemsJSON`");
        await queryRunner.query("ALTER TABLE `zombie` ADD `itemsJSON` varchar(9999) NOT NULL");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `inventoryValueEUR`");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `inventoryValueUSD`");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `inventoryValuePLN`");
    }

}
