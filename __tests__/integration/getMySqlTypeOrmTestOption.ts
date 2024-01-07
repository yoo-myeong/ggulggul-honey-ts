import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const getMySqlTypeOrmTestOption = () => ({
  type: 'mysql',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '12345678',
  database: 'gh',
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
});
