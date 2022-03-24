import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateForeignKeys1648078419985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'pilots',
      new TableForeignKey({
        columnNames: ['shipId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ships',
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'contracts',
      new TableForeignKey({
        columnNames: ['pilotCertificationDocument'],
        referencedColumnNames: ['certificationDocument'],
        referencedTableName: 'pilots',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const pilotsTable = (await queryRunner.getTable('pilots')) as Table
    const pilotsForeignKey = pilotsTable.foreignKeys.find((fk: any) =>
      fk.columnNames.includes('shipId'),
    ) as TableForeignKey
    await queryRunner.dropForeignKey('pilots', pilotsForeignKey)

    const contractsTable = (await queryRunner.getTable('contracts')) as Table
    const contractsForeignKey = contractsTable.foreignKeys.find((fk: any) =>
      fk.columnNames.includes('pilotCertificationDocument'),
    ) as TableForeignKey
    await queryRunner.dropForeignKey('contracts', contractsForeignKey)
  }
}
