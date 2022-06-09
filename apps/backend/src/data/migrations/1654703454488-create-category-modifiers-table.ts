import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateCategoryModifiersTable1654703454488
  implements MigrationInterface
{
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'modifier-category',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isNullable: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: true
          },
          {
            name: 'min_selection',
            type: 'int'
          },
          {
            name: 'max_selection',
            type: 'int'
          },
          {
            name: 'product_id',
            type: 'int',
            isNullable: true
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'modifier-category',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE'
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const catModTable = await queryRunner.getTable('modifier-category');
    const foreignKey = catModTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('product_id') !== -1
    );
    await queryRunner.dropForeignKey('modifier-category', foreignKey);
    await queryRunner.dropTable('modifier-category');
  }
}
