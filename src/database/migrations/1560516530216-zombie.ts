/* tslint:disable */
import {MigrationInterface, QueryRunner} from "typeorm";

export class zombie1560516530216 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `zombie` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `item` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `age` int NOT NULL, `zombie_id` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `item` ADD CONSTRAINT `FK_5f53af6cfb21f4176922f5b5daa` FOREIGN KEY (`zombie_id`) REFERENCES `zombie`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `item` DROP FOREIGN KEY `FK_5f53af6cfb21f4176922f5b5daa`");
        await queryRunner.query("DROP TABLE `item`");
        await queryRunner.query("DROP TABLE `zombie`");
    }

}
