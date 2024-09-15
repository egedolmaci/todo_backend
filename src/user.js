import { pool } from "./db.js";

const addUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    await pool.query("insert into users(username, password) values ($1, $2)", [
      username,
      password,
    ]);

    res.status(200).send("user created");
  } catch (error) {
    next(error);
  }
};

export { addUser };
