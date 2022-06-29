import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class createCreatedatTable1656493148863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        isNullable: false
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product', 'created_at');
  }
}
