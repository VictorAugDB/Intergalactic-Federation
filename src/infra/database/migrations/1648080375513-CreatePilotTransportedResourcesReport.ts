import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePilotTransportedResourcesReport1648080375513
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pilots_resources',
        columns: [
          {
            name: 'name',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'water',
            type: 'integer',
          },
          {
            name: 'food',
            type: 'integer',
          },
          {
            name: 'minerals',
            type: 'integer',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pilots_resources')
  }
}
