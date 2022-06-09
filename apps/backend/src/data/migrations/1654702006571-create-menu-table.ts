import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateMenuTable1654702006571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'menu',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true
          },
          {
            name: 'store_id',
            type: 'int'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'description',
            type: 'text',
            length: '2000',
            isNullable: true
          },
          {
            name: 'working_hours',
            type: 'json'
          },
          {
            name: 'channel',
            type: 'enum'
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'menu',
      new TableForeignKey({
        columnNames: ['store_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'store',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const menuTable = await queryRunner.getTable('menu');
    const foreignKey = menuTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('store_id') !== -1
    );
    await queryRunner.dropForeignKey('menu', foreignKey);
    await queryRunner.dropTable('menu');
  }
}
