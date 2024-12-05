const connection = require("./config");


const createTableIfNotExists = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      birth DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Table 'users' ensured to exist.");
    }
  });
};

createTableIfNotExists();


const getEmail = (req, res) => {
  const { email } = req.query;

  const query = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      return res.status(502).json({ message: "Server error." });
    }
    if (results[0].count > 0) {
      return res.status(200).json({ message: "User exists" });
    }
    return res.status(400).json({ message: "Email not exist." });
  });
};


const saveUser = (req, res) => {
  const { email, first_name, last_name, phone, birth } = req.body;
  const query = `INSERT INTO users (email, first_name, last_name, phone, birth) VALUES (?, ?, ?, ?, ?)`;

  connection.query(query,[email, first_name, last_name, phone, birth],(err, result) => {
      if (err) {
        return res.status(err.code === 'ER_DUP_ENTRY' ? 400 : 502).json({ message: "Email exists." });
      } else {
        return res.status(200).json({  message: "Email saved successfully!"  });
      } 
    });
};

exports.getEmail = getEmail;
exports.saveUser = saveUser;
