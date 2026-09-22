import fs from "fs";
import path from "path";
import { pool } from "./pool";

async function init() {
  const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
  try {
    await pool.query(sql);
    // eslint-disable-next-line no-console
    console.log("✅ Database schema is ready (todos table created/verified).");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("❌ Failed to initialize database schema:", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

init();
