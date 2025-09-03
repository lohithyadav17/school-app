import db from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { city, search } = req.query;

      let query = "SELECT * FROM schools";
      let values = [];

      if (city) {
        query += " WHERE city = ?";
        values.push(city);
      }

      if (search) {
        if (city) {
          query += " AND name LIKE ?";
        } else {
          query += " WHERE name LIKE ?";
        }
        values.push(`%${search}%`);
      }

      const [rows] = await db.query(query, values);
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch schools" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
