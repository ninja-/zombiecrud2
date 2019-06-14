/* tslint:disable */

import {MigrationInterface, QueryRunner} from "typeorm";

export class fixCacheLength1560533023636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `cache` DROP COLUMN `value`");
        await queryRunner.query("ALTER TABLE `cache` ADD `value` varchar(999) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `cache` DROP COLUMN `value`");
        await queryRunner.query("ALTER TABLE `cache` ADD `value` varchar(255) NOT NULL");
    }

}
