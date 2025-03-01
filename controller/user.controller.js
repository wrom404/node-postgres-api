import pool from "../config/connectDb.js";

export async function getUsers(req, res) {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    return res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getUsersById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function createUser(req, res) {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
      [name, email]
    );
    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User updated successfully", data: result.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "User deleted successfully", data: result.rows[0] });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
