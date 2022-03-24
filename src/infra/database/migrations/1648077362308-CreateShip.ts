import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateShip1648077362308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ships',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'fuelCapacity',
            type: 'integer',
          },
          {
            name: 'fuelLevel',
            type: 'integer',
          },
          {
            name: 'weightCapacity',
            type: 'integer',
          },
          {
            name: 'weightLevel',
            type: 'integer',
          },
          {
            name: 'location',
            type: 'varchar',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ships')
  }
}
