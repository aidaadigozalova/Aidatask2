const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");

addButton.addEventListener("click", () => {
  addTask(""); 
});

function addTask(text = "") {
  const li = document.createElement("li");
  li.classList.add("task");
  li.setAttribute("draggable", true);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Yeni tapşırıq...";
  input.value = text; 
  input.classList.add("task-text");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");

  const deleteImg = document.createElement("img");
  deleteImg.src = "Group 39.svg"; 
  deleteImg.alt = "Delete";
  deleteImg.classList.add("delete-icon");

  deleteBtn.appendChild(deleteImg);
  li.appendChild(input);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);


  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });


  deleteBtn.addEventListener("mouseover", () => {
    deleteImg.src = "Group 52.svg";
  });
  deleteBtn.addEventListener("mouseout", () => {
    deleteImg.src = "Group 39.svg";
  });

  addDragAndDrop(li);
}


function addDragAndDrop(element) {
  element.addEventListener("dragstart", () => {
    element.classList.add("dragging");
  });

  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");
  });

  taskList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(taskList, e.clientY);
    if (afterElement == null) {
      taskList.appendChild(dragging);
    } else {
      taskList.insertBefore(dragging, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".task:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}
