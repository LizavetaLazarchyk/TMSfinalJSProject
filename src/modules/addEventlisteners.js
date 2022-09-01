import { createTodo, taskList } from "./createNewTasks.js";
import { todos } from "./render.js";

const newTasks = document.querySelector("#new");
const oldTasks = document.querySelector("#old");
const doneTasks = document.querySelector("#done");
const notDoneTasks = document.querySelector("#notDone");
const taskItem = document.querySelectorAll(".tasks__item");

export function listenersFilters() {
  doneTasks.addEventListener("input", () => {
    taskList.style.flexDirection = "column";
    taskItem.forEach((task) => {
      if (!task.className.includes("done")) {
        task.style.order = "2";
      } else {
        task.style.order = "1";
      }
    });
  });

  notDoneTasks.addEventListener("input", () => {
    taskList.style.flexDirection = "column";
    taskItem.forEach((task) => {
      if (!task.className.includes("done")) {
        task.style.order = "1";
      } else {
        task.style.order = "2";
      }
    });
  });

  oldTasks.addEventListener("input", () => {
    taskItem.forEach((task) => {
      task.style.order = "0";
    });
    taskList.style.flexDirection = "column";
  });

  newTasks.addEventListener("input", () => {
    taskItem.forEach((task) => {
      task.style.order = "0";
    });
    taskList.style.flexDirection = "column-reverse";
  });
}

const newTaskInput = document.querySelector(".add-task__input");
const newTaskBtn = document.querySelector(".add-task__btn");

export function listenersToDo() {
  newTaskInput.addEventListener("input", (event) => {
    newTaskBtn.disabled = event.currentTarget.value === "";
  });

  newTaskBtn.addEventListener("click", () => {
    const todo = {
      id: todos.length >= 1 ? todos.at(-1).id + 1 : 1,
      description: newTaskInput.value,
      isCompleted: false,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().slice(0, -3),
    };
    newTaskInput.value = "";
    newTaskBtn.disabled = true;

    const newTodoItem = createTodo(
      todo.id,
      todo.description,
      todo.isCompleted,
      todo.date,
      todo.time
    );
    taskList.append(newTodoItem);
    todos.push(todo);

    const jsonTodos = JSON.stringify(todos);
    localStorage.setItem("todos", jsonTodos);
  });

  taskList.addEventListener("click", (event) => {
    switch (event.target.dataset.action) {
      case "remove": {
        const li = event.target.closest(".tasks__item");
        li.remove();
        const index = todos.findIndex((todo) => todo.id === +li.dataset.id);
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        break;
      }
      case "done": {
        const li = event.target.closest(".tasks__item");
        li.classList.toggle("done");
        const todo = todos.find((todo) => todo.id === +li.dataset.id);
        todo.isCompleted = !todo.isCompleted;
        localStorage.setItem("todos", JSON.stringify(todos));
        break;
      }
      default:
        break;
    }
  });
}

const user = document.querySelector(".header__user");
const modal = document.querySelector(".pop-up");
const closeBtn = document.querySelector(".pop-up__close");

export function listenersMofal() {
  user.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
