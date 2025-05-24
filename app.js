#!/usr/bin/env node

const fs = require("fs");

//Directory of data file
const filename = "./todo.json";

//Check if todo file exists
if (!fs.existsSync(filename)) {
  fs.writeFileSync(filename, JSON.stringify([]), "utf8");
}

//Read JSON file using node file system
const readTasks = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    console.log(error);
    console.log("Error occurred during process");
    process.exit(1);
  }
};

//Write to JSON file using node file system
const writeTasks = (file, task) => {
  try {
    return fs.writeFileSync(file, JSON.stringify(task, null, 2), "utf8");
  } catch (error) {
    console.log(error);
    console.log("Error occurred during process");
    process.exit(1);
  }
};

//Listing all tasks
const listAllTasks = () => {
  const tasks = readTasks(filename);
  if (tasks.length === 0) {
    return console.log("No task found.");
  } else {
    tasks.forEach((task) => {
      console.log(
        `id: ${task.id}. \n Description: ${task.description} \n Status: [${task.status}] \n createdAt: ${task.createdAt} \n updatedAt: ${task.updatedAt}`
      );
    });
  }
  return;
};

//listing all done tasks
const listDoneTasks = () => {
  const tasks = readTasks(filename);
  if (tasks.length === 0) {
    return console.log("No task found.");
  }
  tasks.filter(
    (task) =>
      task.status === "done" &&
      console.log(
        `id: ${task.id}. \n Description: ${task.description} \n Status: [${task.status}] \n createdAt: ${task.createdAt} \n updatedAt: ${task.updatedAt}`
      )
  );
  return;
};

//listing all task in-progress
const listInProgressTasks = () => {
  const tasks = readTasks(filename);
  if (tasks.length === 0) {
    return console.log("No task found.");
  }
  tasks.filter(
    (task) =>
      task.status === "in-progress" &&
      console.log(
        `id: ${task.id}. \n Description: ${task.description} \n Status: [${task.status}] \n createdAt: ${task.createdAt} \n updatedAt: ${task.updatedAt}`
      )
  );
  return;
};

//listing all task waiting todo
const listtodoTasks = () => {
  const tasks = readTasks(filename);
  if (tasks.length === 0) {
    return console.log("No task found.");
  }
  tasks.filter(
    (task) =>
      task.status === "todo" &&
      console.log(
        `id: ${task.id}. \n Description: ${task.description} \n Status: [${task.status}] \n createdAt: ${task.createdAt} \n updatedAt: ${task.updatedAt}`
      )
  );
  return;
};

//Adding a new task
const addTask = (description) => {
  let tasks = readTasks(filename);
  let newId = tasks.length;
  newId++;

  const now = new Date();
  const newTask = {
    id: parseInt(newId),
    description,
    status: "todo",
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(newTask);
  writeTasks(filename, tasks);
  return console.log(`Task added successfully (ID: ${newTask.id})`);
};

//Updating a task
const updateTask = (id, description) => {
  let tasks = readTasks(filename);
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex !== -1 || taskIndex !== undefined) {
    tasks[taskIndex].description = description;
    writeTasks(filename, tasks);
    return console.log(`Task ${id} is updated.`);
  } else {
    return console.log(`Task with ID: ${id} not found.`);
  }
};

//Marking a task as done
const updateStatusDoneTask = (id) => {
  let tasks = readTasks(filename);
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex !== -1 || taskIndex !== undefined) {
    tasks[taskIndex].status = "done";
    writeTasks(filename, tasks);
    return console.log(`Marked task ${id} as done.`);
  } else {
    return console.log(`Task with ID: ${id} not found.`);
  }
};

//Marking a task as in-progress
const updateStatusInProgressTask = (id) => {
  let tasks = readTasks(filename);
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex !== -1 || taskIndex !== undefined) {
    tasks[taskIndex].status = "in-progress";
    writeTasks(filename, tasks);
    return console.log(`Marked task ${id} as in-progress.`);
  } else {
    return console.log(`Task with ID: ${id} not found.`);
  }
};

//Deleting a task
const deleteTask = (id) => {
  let tasks = readTasks(filename);
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex >= 0 || taskIndex !== undefined) {
    tasks.splice(taskIndex, 1);
    tasks.forEach((task, i) => (task.id = i + 1));
    writeTasks(filename, tasks);
    return console.log(`Deleted the task from the list`);
  } else {
    return console.log(`Task with ID: ${id} not found.`);
  }
};

const args = process.argv.slice(2);

switch (args[0]) {
  case "add":
    if (args.length < 2) {
      console.log(
        `Description of task is required. 'task-cli help' for more info`
      );
      process.exit(1);
    }
    addTask(args[1].toString());
    break;
  case "update":
    if (args.length < 3) {
      console.log(
        ` ID and Description of task is required. 'task-cli help' for more info`
      );
      process.exit(1);
    } else if (!parseInt(args[1])) {
      console.log(typeof args[1]);

      console.log(`ID provided is not a Number. 'task-cli help' for more info`);
      process.exit(1);
    }
    updateTask(parseInt(args[1]), args[2].toString());
    break;
  case "delete":
    if (args.length < 2 || !parseInt(args[1])) {
      console.log(
        `ID is not provided OR is not a Number. 'task-cli help' for more info`
      );
      process.exit(1);
    }
    deleteTask(parseInt(args[1]));
    break;
  case "mark-done":
    if (args.length < 2 || !parseInt(args[1])) {
      console.log(
        `ID is not provided OR is not a Number. 'task-cli help' for more info`
      );
      process.exit(1);
    }
    updateStatusDoneTask(parseInt(args[1]));
    break;
  case "mark-in-progress":
    if (args.length < 2 || !parseInt(args[1])) {
      console.log(
        `ID is not provided OR is not a Number. 'task-cli help' for more info`
      );
      process.exit(1);
    }
    updateStatusInProgressTask(parseInt(args[1]));
    break;
  case "list":
    if (args.length < 2) {
      listAllTasks();
    } else if (args[1] === "done") {
      listDoneTasks();
    } else if (args[1] === "in-progress") {
      listInProgressTasks();
    } else if (args[1] === "todo") {
      listtodoTasks();
    } else {
      listAllTasks();
    }
    break;
  case "help":
    listOption();
    break;
  default:
    console.log(
      "Input is an invalid command" +
        "\n" +
        "Check 'task-cli help' for more information."
    );
    process.exit(1);
}

function listOption() {
  console.log(`
    Usage: task-cli [options]

    Options:
      add [desc]              Add a new task with provided description
      update [id] [desc]      Update an existing task with provided id task with new description
      delete [id]             Deletes the task with the provided task id
      mark-done [id]          Mark a task as done
      mark-in-progress [id]   Mark a task as in-progress
      list                    List all tasks
      list done               List all done tasks
      list in-progress        List all task in-progress
      list todo               List all todo tasks
      help                    Show help information
  `);
}
