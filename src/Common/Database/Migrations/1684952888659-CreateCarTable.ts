import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCarTable1684952888659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'car',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'modelId',
            type: 'int',
          },
          {
            name: 'isApproved',
            type: 'boolean',
          },
          {
            name: 'imageUrl',
            type: 'varchar',
            length: '255',
            isNullable: true,
            default: '',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'car',
      new TableForeignKey({
        columnNames: ['modelId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'model',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const carTable = await queryRunner.getTable('car');
    const foreignKey = carTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('modelId') !== -1,
    );
    await queryRunner.dropForeignKey('car', foreignKey);
    await queryRunner.dropTable('car');
  }
}
