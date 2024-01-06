import { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral } from 'typeorm';
import path from 'path';

export class TypeOrm {
  private static dataSource: DataSource;

  public static connect(ctx: DataSourceOptions) {
    const entityPath = path.join(__dirname, '../../../src/libs/entity/**/*.ts');
    this.dataSource = new DataSource({
      ...ctx,
      entities: [entityPath],
    });
  }

  public static getRepository(entity: EntityTarget<ObjectLiteral>) {
    return this.dataSource.getRepository(entity);
  }

  public static async query<T>(sql: string, params?: unknown[]) {
    const rows = await this.dataSource.query(sql, params);

    return rows as T[];
  }
}
