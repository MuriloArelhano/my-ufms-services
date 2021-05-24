import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createProfileTable1621880900059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'profile',
            columns: [
                {
                    name: 'profile_id',
                    type: 'uuid',
                    isPrimary: true,
                    isUnique: true
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: false

                },
                {
                    name: 'photo',
                    type: 'varchar',

                },
                {
                    name: 'complete_name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'birthdate',
                    type: 'date',
                    isNullable: false
                },
                {
                    name: "gender_id",
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'biography',
                    type: 'varchar'
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
        }), true, true, true)

        await queryRunner.createForeignKey("profile", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["user_id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("profile", new TableForeignKey({
            columnNames: ["gender_id"],
            referencedColumnNames: ["gender_id"],
            referencedTableName: "gender",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("profile")

        let userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1)
        await queryRunner.dropForeignKey("profile", userForeignKey)

        userForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("gender_id") !== -1)
        await queryRunner.dropForeignKey("profile", userForeignKey)
        await queryRunner.dropTable('profile')
    }

}
