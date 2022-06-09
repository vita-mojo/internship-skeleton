import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class CreateCategoryModifiersTable1654703454488
  implements MigrationInterface
{
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Category_Modifiers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'min_selection',
            type: 'int'
          },
          {
            name: 'max_selection',
            type: 'int'
          }
        ]
      }),
      true
    );

    await queryRunner.addColumn(
      'Category_Modifiers',
      new TableColumn({
        name: 'product_id',
        type: 'int'
      })
    );

    await queryRunner.createForeignKey(
      'Category_Modifiers',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Product',
        onDelete: 'CASCADE'
      })
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const catModTable = await queryRunner.getTable('Category_Modifiers');
    const foreignKey = catModTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('product_id') !== -1
    );
    await queryRunner.dropForeignKey('Category_Modifiers', foreignKey);
    await queryRunner.dropColumn('Category_Modifiers', 'product_id');
    await queryRunner.dropTable('Category_Modifiers');
  }
}
