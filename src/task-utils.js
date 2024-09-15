const updateTask = (task_status) => {
  switch (task_status) {
    case "pending":
      return "in-progress";
    case "in-progress":
      return "completed";
    default:
      return task_status;
  }
};

export { updateTask };
