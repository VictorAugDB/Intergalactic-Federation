import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePilot1648076862229 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pilots',
        columns: [
          {
            name: 'certificationDocument',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'shipId',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'integer',
          },
          {
            name: 'credits',
            type: 'float',
          },
          {
            name: 'locationPlanet',
            type: 'varchar',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pilots')
  }
}
