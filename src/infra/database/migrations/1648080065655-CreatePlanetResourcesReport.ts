import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePlanetResourcesReport1648080065655
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'planets_resources',
        columns: [
          {
            name: 'planet',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'sent',
            type: 'jsonb',
          },
          {
            name: 'received',
            type: 'jsonb',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('planets_resources')
  }
}
