const input = document.getElementById("input-box");
const listTodo = document.getElementById("listTask");
const addTask = document.getElementById("add");
const icone = document.getElementById("checked");
const nothing = document.getElementById("nothing");
let isEditing = false;
let editingId = null;

let todoList = [];

function initPage() {
  listTodo.innerHTML = "";
  if (todoList.length === 0) {
    nothing.classList.remove("hidden");
    nothing.classList.add("block");
  } else {
    nothing.classList.remove("block");
    nothing.classList.add("hidden");

    for (todo of todoList) {
      const div = renderTask(todo);
      listTodo.appendChild(div);
    }
  }
}

function renderTask(todo) {
  const div = document.createElement("div");
  div.classList.add(
    "border",
    "rounded",
    "bg-pink-50/[0.9]",
    "shadow",
    "mx-auto",
    "p-4",
    "flex",
    "w-4/5",
    "justify-evenly",
    "items-center"
  );
  const div2 = document.createElement("div");
  div2.classList.add("flex", "flex-col", "w-2/3");

  const p = document.createElement("p");
  p.classList.add("inline-block", "mr-2");
  p.textContent = todo.task;

  const code = document.createElement("code");
  code.classList.add("italic", "text-sm", "text-gray-400");
  code.textContent = "Created: " + todo.date;

  const doneCheckbox = document.createElement("a");
  doneCheckbox.setAttribute("href", "#");

  if (todo.done) {
    doneCheckbox.classList.add("text-pink-600", "fa-solid", "fa-square-check");
    p.classList.add("line-through");
  } else {
    doneCheckbox.classList.add("text-pink-600", "fa-regular", "fa-square");
  }
  doneCheckbox.addEventListener("click", function () {
    todo.done = !todo.done;
    initPage();
  });

  const editButton = document.createElement("a");
  editButton.setAttribute("href", "#");
  editButton.classList.add("text-pink-600", "fa-solid", "fa-pen");

  editButton.addEventListener("click", function () {
    isEditing = true;
    editingId = todo.id;
    input.value = p.textContent;
  });

  const removeButton = document.createElement("a");
  removeButton.setAttribute("href", "#");
  removeButton.classList.add("text-pink-600", "fa-solid", "fa-trash-can");

  div.appendChild(div2);
  div2.appendChild(p);
  div2.appendChild(code);
  div.appendChild(doneCheckbox);
  div.appendChild(editButton);
  div.appendChild(removeButton);
  removeButton.addEventListener("click", function () {
    console.log("old todo list", todoList);
    console.log("deleting todo with id " + todo.id);
    todoList = todoList.filter(function (t) {
      return t.id !== todo.id;
    });
    console.log("new todo list", todoList);
    initPage();
  });

  return div;
}

addTask.addEventListener("click", function (e) {
  e.preventDefault();
  if (input.value === "") {
    document.getElementById("alert").classList.remove("-right-[100%]");
    document.getElementById("alert").classList.add("right-2");
    document.getElementById("alert-message").textContent =
      "Please enter a task";
    document.getElementById("closebtn").addEventListener("click", function () {
      document.getElementById("alert").classList.remove("right-2");
      document.getElementById("alert").classList.add("-right-[100%]");
    });
    setTimeout(function () {
      document.getElementById("alert").classList.remove("right-2");
      document.getElementById("alert").classList.add("-right-[100%]");
    }, 6000);
    nothing.classList.add("block");
    return;
  } else {
    if (isEditing) {
      todoList = todoList.map(function (todo) {
        if (todo.id === editingId) {
          todo.task = input.value;
          todo.done = false;
        }
        return todo;
      });
      isEditing = false;
      editingId = null;
    } else {
      const task = input.value;
      const randomId = Math.floor(Math.random() * 1000000);
      const date = new Date();

      todoList.push({
        id: randomId,
        task: task,
        done: false,
        date: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
      });
    }

    initPage();

    input.value = "";
  }
});
