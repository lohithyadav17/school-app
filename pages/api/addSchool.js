import formidable from "formidable";
import path from "path";
import pool from "../../lib/db";

export const config = {
  api: {
    bodyParser: false, // disable Next.js default body parser (for file uploads)
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const contentType = req.headers["content-type"] || "";

    // --- Case 1: FormData (multipart) ---
    if (contentType.includes("multipart/form-data")) {
      const form = formidable({
        multiples: false,
        uploadDir: path.join(process.cwd(), "public/schoolImages"),
        keepExtensions: true,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Form parse error:", err);
          return res.status(500).json({ error: "Error parsing form data" });
        }

        const { name, address, city, state, contact, email_id } = fields;
        const fileName = files.image?.newFilename;

        if (!fileName) {
          return res.status(400).json({ error: "Image upload failed" });
        }

        await pool.query(
          "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, address, city, state, contact, email_id, `/schoolImages/${fileName}`]
        );

        return res.status(200).json({ message: "School added successfully" });
      });

      return;
    }

    // --- Case 2: JSON request ---
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const { name, address, city, state, contact, email_id, image } = data;

        await pool.query(
          "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, address, city, state, contact, email_id, image || null]
        );

        return res.status(200).json({ message: "School added successfully" });
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);
        return res.status(400).json({ error: "Invalid JSON body" });
      }
    });
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
