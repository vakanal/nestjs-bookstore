import { registerAs } from '@nestjs/config';

export interface IConfig {
  port: number;
  host: string;
  username: string;
  password: string;
  database: string;
}

export default registerAs('configData', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || 'localhost',
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
}));
