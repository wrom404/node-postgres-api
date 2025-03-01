import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;

dotenv.config();

const pool = new Pool({
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
  port: process.env.db_port,
});

async function connectDb() {
  try {
    await pool.connect();
    console.log("connected to database");
  } catch (error) {
    console.log("Error", error);
  }
}

connectDb();

export default pool;
