import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateModifiersTable1654703549333 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'modifiers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true
          },
          {
            name: 'modif_cat_id',
            type: 'int'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'price',
            type: 'float'
          },
          {
            name: 'is_default',
            type: 'boolean'
          },
          {
            name: 'metadata',
            type: 'json'
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'modifiers',
      new TableForeignKey({
        columnNames: ['modif_cat_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'modifier-category',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const modifiersTable = await queryRunner.getTable('modifiers');
    const foreignKey = modifiersTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('modif_cat_id') !== -1
    );
    await queryRunner.dropForeignKey('modifiers', foreignKey);
    await queryRunner.dropTable('modifiers');
  }
}
