import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DBHOST,       // Railway private domain
  user: process.env.DBUSER,       // e.g., root
  password: process.env.DBPASSWORD, 
  database: process.env.DBNAME,
});

export default db;

