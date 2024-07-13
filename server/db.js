const mysql = require("mysql2");

// Create a connection pool (recommended for production)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "efa22@Bod",
  database: "fitness_app",
  connectionLimit: 10, // Adjust this number based on your database's capacity
});

// Export the pool to be used in other modules
module.exports = pool.promise();
