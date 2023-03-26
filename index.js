// function openSideNav() {
//   document.getElementById("sideNavBar").style.width = "240px";
// }

// function closeSideNav() {
//   document.getElementById("sideNavBar").style.width = "0";
// }

function openModal() {
  let modal = document.getElementById("idModal");
  let openButton = document.getElementsByClassName("add-button")[0];
  let closeButton = document.getElementsByClassName("close-button")[0];

  openButton.onclick = () => {
    modal.style.display = "block";
  };

  closeButton.onclick = () => {
    modal.style.display = "none";
  };
}

function closeModal() {
  let modal = document.getElementById("idModal");
  modal.style.display = "none";
}

function addTask() {
  let taskList = document.getElementById("idTaskList").value;
  let task = document.getElementById("idTitle").value;
  let deadline = document.getElementById("idDueDate").value;
  let idPriority = ["idLow", "idMedium", "idHigh", "idUrgent"];
  for (let i of idPriority) {
    if (document.getElementById(i).checked) {
      var urgency = document.getElementById(i).value;
    }
  }
  let notes = document.getElementById("idDescription").value;

  const taskArray = JSON.parse(localStorage.getItem("whattodo")) ?? [];
  if (taskList && task) {
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
    localStorage.setItem("whattodo", JSON.stringify(taskArray));

    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.innerText = taskObject.title;

    const renderElement = document.getElementById("idRenderElement");
    renderElement.appendChild(taskItem);
  }
}
