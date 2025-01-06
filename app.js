const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");

let tasks = [];

// Add a new task
addTaskButton.addEventListener("click", () => {
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    const newTask = { id: Date.now(), text: taskText, completed: false };
    tasks.push(newTask);
    renderTasks();
    newTaskInput.value = "";
  }
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.draggable = true;

    const taskContent = document.createElement("div");
    taskContent.className = "task-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) taskText.classList.add("completed");

    const taskInput = document.createElement("input");
    taskInput.className = "task-input";
    taskInput.type = "text";
    taskInput.value = task.text;

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => startEditingTask(task.id, taskText, taskInput));

    taskText.addEventListener("dblclick", () => startEditingTask(task.id, taskText, taskInput));
    taskInput.addEventListener("blur", () => finishEditingTask(task.id, taskText, taskInput));
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") finishEditingTask(task.id, taskText, taskInput);
    });

    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskText);
    taskContent.appendChild(taskInput);
    
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("task-buttons");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    buttonsDiv.appendChild(deleteButton);
    buttonsDiv.appendChild(editButton); // Move edit button beside delete button

    li.appendChild(taskContent);
    li.appendChild(buttonsDiv);

    // Add drag-and-drop functionality
    li.addEventListener("dragstart", () => (li.classList.add("dragging")));
    li.addEventListener("dragend", () => (li.classList.remove("dragging")));
    li.addEventListener("dragover", (e) => dragOver(e, tasks.indexOf(task)));

    taskList.appendChild(li);
  });
}

// Toggle task completion
function toggleTaskCompletion(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  task.completed = !task.completed;
  renderTasks();
}

// Start editing a task
function startEditingTask(taskId, taskText, taskInput) {
  taskText.style.display = "none";
  taskInput.style.display = "inline";
  taskInput.focus();
}

// Finish editing a task
function finishEditingTask(taskId, taskText, taskInput) {
  const task = tasks.find((t) => t.id === taskId);
  task.text = taskInput.value.trim() || task.text;
  taskText.textContent = task.text;
  taskText.style.display = "inline";
  taskInput.style.display = "none";
  renderTasks();
}

// Delete a task
function deleteTask(taskId) {
  tasks = tasks.filter((t) => t.id !== taskId);
  renderTasks();
}

// Drag-and-drop handling
function dragOver(e, index) {
 e.preventDefault();
  const draggingElement = document.querySelector(".dragging");
  const taskItems = [...taskList.children];
  const currentElement = taskItems[index];
  taskList.insertBefore(draggingElement, currentElement);
}

// Reorder tasks after drag-and-drop
function reorderTasks() {
  const taskItems = [...taskList.children];
  tasks = taskItems.map((item) => {
    const taskText = item.querySelector(".task-content span").textContent;
    const isCompleted = item.querySelector(".task-content input[type='checkbox']").checked;
    const taskId = tasks.find(t => t.text === taskText && t.completed === isCompleted).id; // Keep the original ID
    return { id: taskId, text: taskText, completed: isCompleted };
  });
}

// Initial render
renderTasks();