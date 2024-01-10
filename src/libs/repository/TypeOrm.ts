import { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral } from 'typeorm';
import path from 'path';

export class TypeOrm {
  private static dataSource: DataSource;

  public static async connect(ctx: unknown) {
    const entityPath = path.join(__dirname, '../../../src/libs/**/*.{t,j}s');
    this.dataSource = new DataSource({
      ...(ctx as DataSourceOptions),
      entities: [entityPath],
    });

    await this.dataSource.initialize();
  }

  public static async disconnect() {
    await this.dataSource.destroy();
  }

  public static getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>) {
    return this.dataSource.getRepository<T>(entity);
  }

  public static async query<T>(sql: string, params?: unknown[]) {
    const rows = await this.dataSource.query(sql, params);

    return rows as T[];
  }
}
