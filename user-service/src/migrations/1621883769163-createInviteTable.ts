import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createInviteTable1621883769163 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "invite",
            columns: [
                {
                    name: "invite_id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "user_sender_id",
                    type: "uuid",
                },
                {
                    name: "user_receiver_id",
                    type: "uuid",
                },
                {
                    name: "confirmation_date",
                    type: "date",
                    isNullable: true,
                    default: null
                },
                {
                    name: 'accepted',
                    type: 'boolean',
                    isNullable: false,
                    default: false
                },
                {
                    name: 'rejected',
                    type: 'boolean',
                    isNullable: false,
                    default: false

                },
                {
                    name: 'created_At',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable: false
                },
                {
                    name: 'updated_At',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }
        ), true, true)

        await queryRunner.createForeignKeys('invite', [
            new TableForeignKey({
                 columnNames: ['user_sender_id'],
                 referencedColumnNames: ['user_id'],
                 referencedTableName: 'user',
                 onDelete: 'CASCADE'
            }),
            new TableForeignKey({
                columnNames: ['user_receiver_id'],
                referencedColumnNames: ['user_id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE'
           })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("invite")
        const userForeignKey = table.foreignKeys.filter(fk => fk.columnNames.indexOf("user_id") !== -1)
        await queryRunner.dropForeignKeys("invite", userForeignKey)
        await queryRunner.dropTable('invite')
    }

}
