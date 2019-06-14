import {MigrationInterface, QueryRunner} from "typeorm";

export class zombieItems1560520108818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `pet` DROP FOREIGN KEY `fk_user_pet`");
        await queryRunner.query("ALTER TABLE `zombie` ADD `itemsJSON` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `pet` ADD CONSTRAINT `FK_64704296b7bd17e90ca0a620a98` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `pet` DROP FOREIGN KEY `FK_64704296b7bd17e90ca0a620a98`");
        await queryRunner.query("ALTER TABLE `zombie` DROP COLUMN `itemsJSON`");
        await queryRunner.query("ALTER TABLE `pet` ADD CONSTRAINT `fk_user_pet` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT");
    }

}
