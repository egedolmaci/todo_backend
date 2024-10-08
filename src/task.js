import { pool } from "./db.js";
import { updateTask } from "./task-utils.js";

const getTasks = async (req, res, next) => {
  try {
    const username = req.auth.user;
    const results = await pool.query(
      "select id from users where username = $1",
      [username],
    );
    const task_results = await pool.query(
      "select * from tasks where user_id = $1",
      [results.rows[0].id],
    );
    res.status(200).json(task_results.rows);
  } catch (error) {
    next(error);
  }
};

const addTask = async (req, res, next) => {
  const { title, description, status } = req.body;
  try {
    const result = await pool.query(
      "select id from users where username = $1",
      [req.auth.user],
    );
    const user_id = result.rows[0].id;

    await pool.query(
      "insert into tasks(user_id, title, description, status) values($1, $2, $3, $4)",
      [user_id, title, description, status],
    );
    res.status(201).send("task created");
  } catch (error) {
    next(error);
  }
};

const updateTaskByTitle = async (req, res, next) => {
  const title = req.params.title;
  console.log(title);

  try {
    const results = await pool.query(
      "select status from tasks where title = $1",
      [title],
    );
    console.log(results.rows);

    const task_status = updateTask(results.rows[0].status);

    pool.query("update tasks set status = $1 where title = $2", [
      task_status,
      title,
    ]);
    // const new_status = updateTask(results.rows);

    res.status(200).send(`task with title ${title} has been updated`);
  } catch (error) {
    next(error);
  }
};

const deleteTaskById = async (req, res, next) => {
  const task_id = req.params.id;

  try {
    const results = await pool.query("delete from tasks where id = $1", [
      task_id,
    ]);

    if (results.rowCount === 0) {
      return res.status(404).send(`There is no task with task ID: ${task_id}`);
    }
    res.status(200).send(`Task(s) with ID: ${task_id} has been deleted`);
  } catch (error) {
    next(error);
  }
};

export { getTasks, addTask, deleteTaskById, updateTaskByTitle };
