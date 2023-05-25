import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateModelTable1684952888659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'model',
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
            name: 'brandId',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      'car',
      new TableColumn({
        name: 'modelId',
        type: 'int',
      }),
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

    await queryRunner.createForeignKey(
      'model',
      new TableForeignKey({
        columnNames: ['brandId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'brand',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const carTable = await queryRunner.getTable('car');
    const foreignKeyCar = carTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('modelId') !== -1,
    );
    await queryRunner.dropForeignKey('car', foreignKeyCar);

    const modelTable = await queryRunner.getTable('model');
    const foreignKeyModel = modelTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('brandId') !== -1,
    );
    await queryRunner.dropForeignKey('model', foreignKeyModel);

    await queryRunner.dropColumn('car', 'modelId');

    await queryRunner.dropTable('model');
  }
}
