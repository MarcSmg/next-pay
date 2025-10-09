import { Pool } from 'pg';

// Simple connection - no fancy error handling
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: 'localhost',
  port: 5432,
});

export default pool;