  export const taskList = document.querySelector(".tasks__list");

  export function createTodo(id, description, isCompleted, date, time) {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const timeInfo = document.createElement("p");
    const dateCreation = document.createElement("p");
    const timeCreation = document.createElement("p");
    const button = document.createElement("button");

    li.className = isCompleted ? "tasks__item done" : "tasks__item";

    li.append(input, label, timeInfo, button);
    li.dataset.id = id;

    label.append(description);
    label.className = "tasks__item__label";

    input.type = "checkbox";
    input.className = "tasks__item__checkbox";
    input.checked = isCompleted;
    input.dataset.action = "done";
    input.id = `tasks__checkbox-${li.dataset.id}`;

    label.setAttribute("for", input.id);

    timeInfo.className = "tasks__item__info";
    timeInfo.append(dateCreation, timeCreation);

    dateCreation.append(date);
    dateCreation.className = "tasks__item__date";

    timeCreation.append(time);
    timeCreation.className = "tasks__item__time";

    button.className = "tasks__item__btn-delete";
    button.innerHTML = `
    <svg
    data-action = "remove"
    class="tasks__item__svg-delete"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 16">
    <path
    fill-rule="evenodd"
    d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"
    />
    </svg>
    `;

    return li;
  }

