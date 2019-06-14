/* tslint:disable */

import {MigrationInterface, QueryRunner} from "typeorm";

export class cache1560529212925 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `cache` (`id` varchar(255) NOT NULL, `value` varchar(255) NOT NULL, `updated` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `ttlSeconds` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `cache`");
    }

}
