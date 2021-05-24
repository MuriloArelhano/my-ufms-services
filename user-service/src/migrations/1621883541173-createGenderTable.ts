import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createStructure1620054728289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'gender',
            columns: [
                {
                    name: 'gender_id',
                    type: 'uuid',
                    isPrimary: true,
                    isUnique: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                }
            ]
        }), true, false, false)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("gender")
    }

}
