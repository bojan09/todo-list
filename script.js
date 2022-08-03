const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterTodoOption = document.querySelector(".filter-todo");

// ATTACH EVENT LISTENER
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterTodoOption.addEventListener("click", filterTodo);

// FUNCTIONS

// ADD A TODO
function addTodo(event) {
  // prevent form fro submiting
  event.preventDefault();

  // Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create <li>
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // ADD TODO TO LOCAL STORAGE
  saveTodosLocalStorage(todoInput.value);

  // CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // CREATE TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //   Append to list
  todoList.appendChild(todoDiv);

  //   Clear TodoInput Value
  todoInput.value = "";
}

// DELETE TODO
function deleteCheck(event) {
  const item = event.target;

  //   DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    // REMOVE LOCAL TODOS
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  //   CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// FILTER TODOS
function filterTodo(event) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// SAVE TODOS TO LOCAL STORAGE
function saveTodosLocalStorage(todo) {
  // CHECK -- if we have any todos already
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  // CHECK -- if we have any todos already
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  //   if we do have something in local storage get it back
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}

// REMOVE LOCAL TODOS
function removeLocalTodos(todo) {
  // CHECK -- if we have any todos already
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  //   if we do have something in local storage get it back
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
