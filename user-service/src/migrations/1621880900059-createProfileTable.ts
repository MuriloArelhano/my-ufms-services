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
                name:'user_id',
                type: 'uuid',
                
            },
            {
                name: 'photo',
                type: 'varchar',

            }

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
