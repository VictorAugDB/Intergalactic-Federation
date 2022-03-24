import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateContract1648077517659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contracts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'pilotCertificationDocument',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'payload',
            type: 'jsonb',
          },
          {
            name: 'originPlanet',
            type: 'varchar',
          },
          {
            name: 'destinationPlanet',
            type: 'varchar',
          },
          {
            name: 'acceptanceDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'settlementDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'float',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ships')
  }
}
