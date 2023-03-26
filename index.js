// function openSideNav() {
//   document.getElementById("sideNavBar").style.width = "240px";
// }

// function closeSideNav() {
//   document.getElementById("sideNavBar").style.width = "0";
// }

const modal = document.getElementById("idModal");
const taskArray = JSON.parse(localStorage.getItem("whattodo")) ?? [];

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function createTodoItem(taskObject) {
  // Create input checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("done-checkbox");

  // Create child p element
  const textElement = document.createElement("p");
  textElement.innerText = taskObject.title;

  // Create child div element
  const todoDueDate = document.createElement("div");
  todoDueDate.classList.add("todo-due-date");

  if (taskObject.dueDate) {
    const calendarIcon = document.createElement("i");
    calendarIcon.classList.add("fa-solid", "fa-calendar-days");

    const dueDateElement = document.createElement("span");
    dueDateElement.innerText = taskObject.dueDate;

    const styleElement = document.createElement("span");
    styleElement.classList.add("due-date");
    styleElement.appendChild(calendarIcon);
    styleElement.appendChild(dueDateElement);

    todoDueDate.appendChild(styleElement);
  }

  // Create parent div with children of p and div elements
  const todoTitle = document.createElement("div");
  todoTitle.classList.add("todo-title");
  todoTitle.appendChild(textElement);
  todoTitle.appendChild(todoDueDate);

  // Create delete icon for delete button
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can");

  // Create delete button
  const deleteTaskButton = document.createElement("button");
  deleteTaskButton.setAttribute("type", "button");
  deleteTaskButton.classList.add("delete-todo");
  deleteTaskButton.appendChild(deleteIcon);
  deleteTaskButton.addEventListener("click", () => {
    deleteTask(taskObject);
  });

  // Create todo item within a div
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoTitle);
  todoItem.appendChild(deleteTaskButton);

  // Create li element
  const listElement = document.createElement("li");
  listElement.classList.add("todo-item-list");
  listElement.appendChild(todoItem);

  // Render todo item inside ul element of HTML document
  const todoList = document.getElementById("idTodoList");
  todoList.appendChild(listElement);
}

function addNewTask() {
  const taskList = document.getElementById("idTaskList").value;
  const task = document.getElementById("idTitle").value;
  const deadline = document.getElementById("idDueDate").value;
  const idPriority = Array.from(
    document.querySelectorAll('input[name="priority"]:checked')
  );
  const urgency = idPriority[0]?.value || "";
  const notes = document.getElementById("idDescription").value;

  if (!taskList || !task) {
    return;
  }

  const taskObject = {
    id: crypto.randomUUID(),
    list: taskList,
    title: task,
    dueDate: deadline,
    priority: urgency,
    description: notes,
    isCompleted: false,
    isDeleted: false,
  };
  taskArray.push(taskObject);
  createTodoItem(taskObject);
  localStorage.setItem("whattodo", JSON.stringify(taskArray));
  closeModal();
}

function deleteTask(taskObject) {
  const index = taskArray.findIndex((todo) => todo.id === taskObject.id);
  taskArray.splice(index, 1);
  localStorage.setItem("whattodo", JSON.stringify(taskArray));

  const element = document.getElementsByClassName("todo-item-list")[index];
  element.remove();
}

function loadAllTasks() {
  if (taskArray.length > 0) {
    for (let taskObject of taskArray) {
      createTodoItem(taskObject);
    }
  }
}
