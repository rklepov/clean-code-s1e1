// app.js

const addButton = document.getElementsByClassName("button")[0]; //first button
const taskInput = document.getElementById("new-task"); //Add a new task.
const incompleteTaskHolder = document.getElementById("incomplete-tasks"); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

function createNewTaskElement(taskString) {
  const listItem = document.createElement("li");
  listItem.classList.add("task", "task-list___item");

  const checkBox = document.createElement("input"); //checkbox
  checkBox.type = "checkbox";
  checkBox.classList.add("task__check");

  const label = document.createElement("label"); //label
  label.innerText = taskString;
  label.classList.add("task__label", "task__item-text");

  const input = document.createElement("input"); //text
  input.type = "text";
  input.classList.add("task__input", "task__item-text");

  const editButton = document.createElement("button"); //edit button
  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.classList.add("button", "task__edit-button");

  const deleteButton = document.createElement("button"); //delete button
  deleteButton.classList.add("button", "button_delete", "task__delete-button");

  const deleteButtonImg = document.createElement("img"); //delete button image
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "";
  deleteButtonImg.classList.add("button__image", "button__image_action_delete");

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(input);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function addTask() {
  console.log("Add Task...");

  // create a new list item with the text from #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  // append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

function editTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editMode = listItem.classList.contains("task_mode_edit");

  const input = listItem.querySelector(".task__input");
  const label = listItem.querySelector(".task__label");
  const button = listItem.querySelector(".task__edit-button");

  if (editMode) {
    // switch to edit mode
    // label becomes the inputs value.
    label.innerText = input.value;
    button.innerText = "Edit";
  } else {
    input.value = label.innerText;
    button.innerText = "Save";
  }

  // toggle edit mode
  listItem.classList.toggle("task_mode_edit");
  input.classList.toggle("task__input_mode_edit");
  label.classList.toggle("task__label_mode_edit");
}

function deleteTask() {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  // remove the parent list item from the ul.
  ul.removeChild(listItem);
}

function taskCompleted() {
  console.log("Complete Task...");

  // Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  listItem.classList.add("task_completed");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log("Incomplete Task...");
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  listItem.classList.remove("task_completed");
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

// The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  // select ListItems children
  const checkBox = taskListItem.querySelector(".task__check");
  const editButton = taskListItem.querySelector(".task__edit-button");
  const deleteButton = taskListItem.querySelector(".task__delete-button");

  // Bind editTask to edit button.
  editButton.onclick = editTask;
  // Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  // Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

// bind events to list items children(tasksCompleted)
Array.from(incompleteTaskHolder.children).forEach((child) => bindTaskEvents(child, taskCompleted));

// bind events to list items children(tasksIncomplete)
Array.from(completedTasksHolder.children).forEach((child) => bindTaskEvents(child, taskIncomplete));

// Issues with usability don't get seen until they are in front of a human tester.

// prevent creation of empty tasks.

// Change edit to save when you are in edit mode.

//__EOF__
