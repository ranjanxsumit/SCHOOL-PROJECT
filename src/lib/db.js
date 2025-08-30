// /src/lib/db.js
import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });
  const [results] = await db.execute(query, values);
  await db.end();
  return results;
}
