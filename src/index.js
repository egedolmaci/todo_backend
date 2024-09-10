import pool from "./db.js";

const getTasks = (req, res, next) => {
  try {
    pool.query("select * from tasks", (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    });
  } catch (error) {
    next(error);
  }
};

export { getTasks };
