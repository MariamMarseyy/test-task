import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateBrandTable1684952161241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'brand',
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
            name: 'description',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'logo_url',
            type: 'varchar',
            length: '255',
          },
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      'model',
      new TableColumn({
        name: 'brandId',
        type: 'int',
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
    const modelTable = await queryRunner.getTable('model');
    const foreignKey = modelTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('brandId') !== -1,
    );
    await queryRunner.dropForeignKey('model', foreignKey);

    await queryRunner.dropColumn('model', 'brandId');

    await queryRunner.dropTable('brand');
  }
}
