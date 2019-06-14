/* tslint:disable */

import {MigrationInterface, QueryRunner} from "typeorm";

export class fixLengths1560533139349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `cache` DROP COLUMN `value`");
        await queryRunner.query("ALTER TABLE `cache` ADD `value` text NOT NULL");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `itemsJSON`");
        await queryRunner.query("ALTER TABLE `zombie` ADD `itemsJSON` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `itemsJSON`");
        await queryRunner.query("ALTER TABLE `zombie` ADD `itemsJSON` varchar(9999) NOT NULL");
        await queryRunner.query("ALTER TABLE `cache` DROP COLUMN `value`");
    }

}
