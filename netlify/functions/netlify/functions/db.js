const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL_UNPOOLED,
  ssl: {
    rejectUnauthorized: false
  }
});

exports.handler = async (event) => {

  try {

    // create table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT
      )
    `);

    // insert example data
    await pool.query(
      "INSERT INTO users(name,email) VALUES($1,$2)",
      ["Cyrus", "cyrus@email.com"]
    );

    // get users
    const result = await pool.query("SELECT * FROM users");

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Database working",
        users: result.rows
      })
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };

  }

};