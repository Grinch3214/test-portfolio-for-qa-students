import pg from 'pg';
const { Pool } = pg;

export const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'mydb',
  password: 'password',
  port: 15434,
});
