import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createStructure1620054728289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "user_id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "email",
                    type: "varchar",
                    isPrimary: true,
                },
                {
                    name: "phone_number",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "password",
                    type: "varchar"
                },
                {
                    name: 'created_At',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_At',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }
        ), true, true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
