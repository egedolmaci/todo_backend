import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";
import basicAuth from "express-basic-auth";

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production"
      ? process.env.PROD_DATABASE_URL
      : process.env.DEV_DATABASE_URL,
});

const dbAuthorizer = (username, password, cb) => {
  pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username],
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return cb(null, false); // Return false on error
      }

      if (results.rows.length > 0) {
        const user = results.rows[0]; // Fix typo: results.rows[0]

        const passwordMatch = basicAuth.safeCompare(password, user.password);

        if (passwordMatch) {
          console.log("passwordMatch");
          return cb(null, true);
        }
      }

      console.log("authentication failed");
      return cb(null, false); // No match or incorrect password
    },
  );
};

export { pool, dbAuthorizer };
