import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",   // change if remote DB
  user: "root",        // your MySQL username
  password: "Lohi",
  database: "school_db",
});

export default pool;
