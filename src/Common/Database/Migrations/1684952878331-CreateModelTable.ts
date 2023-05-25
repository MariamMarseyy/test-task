import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
export class CreateModelTable1684952878331 implements MigrationInterface {
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
          {
            name: 'isApproved',
            type: 'boolean',
          },
        ],
      }),
      true,
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
    const foreignKeyModel = modelTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('brandId') !== -1,
    );
    await queryRunner.dropForeignKey('model', foreignKeyModel);
    await queryRunner.dropTable('model');
  }
}
