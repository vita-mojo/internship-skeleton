import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';
export class CreateProductTable1654702017251 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'image',
            type: 'text'
          },
          {
            name: 'price',
            type: 'float'
          },
          {
            name: 'description',
            type: 'text'
          },
          {
            name: 'metadata',
            type: 'json'
          },
          {
            name: 'menu_id',
            type: 'int'
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'product',
      new TableForeignKey({
        columnNames: ['menu_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'menu',
        onDelete: 'CASCADE'
      })
    );
  }
  async down(queryRunner: QueryRunner): Promise<void> {
    const productTable = await queryRunner.getTable('product');
    const foreignKey = productTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('menu_id') !== -1
    );
    await queryRunner.dropForeignKey('product', foreignKey);
    await queryRunner.dropTable('product');
  }
}
