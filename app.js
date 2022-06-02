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

  const label = document.createElement("label"); //label
  label.innerText = taskString;
  label.classList.add("task__label", "task__item-text");

  const input = document.createElement("input"); //text
  input.type = "text";
  input.classList.add("task__input", "task__item-text");

  const editButton = document.createElement("button"); //edit button
  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.classList.add("edit", "button", "task__edit-button");

  const deleteButton = document.createElement("button"); //delete button
  deleteButton.classList.add("delete", "button", "task__delete-button");

  const deleteButtonImg = document.createElement("img"); //delete button image
  deleteButtonImg.src = "./remove.svg";
  deleteButton.alt = "";
  deleteButton.classList.add("button__image");
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
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

function editTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .edit-mode
  if (containsClass) {
    //switch to .edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-mode");
}

function deleteTask() {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

function taskCompleted() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//bind events to list items children(tasksCompleted)
Array.from(incompleteTaskHolder.children).forEach((child) => bindTaskEvents(child, taskCompleted));

//bind events to list items children(tasksIncomplete)
Array.from(completedTasksHolder.children).forEach((child) => bindTaskEvents(child, taskIncomplete));

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.

//__EOF__
