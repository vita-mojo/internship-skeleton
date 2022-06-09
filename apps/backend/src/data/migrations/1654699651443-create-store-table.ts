import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStoreTable1654699651443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'store',
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
            name: 'geo',
            type: 'json'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.getTable('store');
  }
}
