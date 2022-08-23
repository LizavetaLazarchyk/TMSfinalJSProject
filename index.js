// Tasks
const newTaskInput = document.querySelector(".add-task__input");
const newTaskBtn = document.querySelector(".add-task__btn");
const taskList = document.querySelector(".tasks__list");
const taskCheckbox = document.querySelectorAll(".tasks__item__checkbox");
const taskText = document.querySelectorAll(".tasks__item__label");
const taskBtnDelete = document.querySelectorAll(".tasks__item__btn-delete");
const taskDate = document.querySelector(".tasks__item__date");
const taskTime = document.querySelector(".tasks__item__time");

let todos = [];

if (localStorage.getItem("todos")) {
    const data = JSON.parse(localStorage.getItem("todos"));
    todos.push(...data);
}

const todoItems = todos.map((item) => {
    const li = createTodo(
        item.id,
        item.description,
        item.isCompleted,
        item.date,
        item.time
    );
    return li;
});

function createTodo(id, description, isCompleted, date, time) {
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

taskList.append(...todoItems);

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

// Filters

const newTasks = document.querySelector("#new");
const oldTasks = document.querySelector("#old");
const doneTasks = document.querySelector("#done");
const notDoneTasks = document.querySelector("#notDone");
const taskItems = document.querySelectorAll(".tasks__item");

doneTasks.addEventListener("input", () => {
    taskList.style.flexDirection = "column";
    taskItems.forEach((task) => {
        if (!task.className.includes("done")) {
            task.style.order = "2";
        } else {
            task.style.order = "1";
        }
    });
});
notDoneTasks.addEventListener("input", () => {
    taskList.style.flexDirection = "column";
    taskItems.forEach((task) => {
        if (!task.className.includes("done")) {
            task.style.order = "1";
        } else {
            task.style.order = "2";
        }
    });
});
oldTasks.addEventListener("input", () => {
    taskItems.forEach((task) => {
        task.style.order = "0";
    });
    taskList.style.flexDirection = "column";
});
newTasks.addEventListener("input", () => {
    taskItems.forEach((task) => {
        task.style.order = "0";
    });
    taskList.style.flexDirection = "column-reverse";
});

// INFO date

const infoTime = document.querySelector(".header__time");
const infoWeekDay = document.querySelector(".info__date__week-day");
const infoMonth = document.querySelector(".info__date__month");
const infoDay = document.querySelector(".info__date__num");

function createManeTime() {
    return new Date().toLocaleTimeString();
}
setInterval(() => (infoTime.innerHTML = createManeTime()), 1000);

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
function createWeekDay() {
    let dayNum = new Date().getDay();
    return days[dayNum];
}
infoWeekDay.append(createWeekDay());

const monthes = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
function createMonth() {
    let monthNum = new Date().getMonth();
    return monthes[monthNum];
}
infoMonth.append(createMonth());

function createDate() {
    return new Date().getDate();
}
infoDay.append(createDate());

// Weather

const degree = document.querySelector(".info__weather__degree");
const aboutSun = document.querySelector(".info__weather__sun");
const windSpeed = document.querySelector(".info__weather__wind__value");

const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=39,9075&lon=116,3972&appid=165c8926906419f045ed06a58d33d5bd";

const fetchResult = fetch(url).then((res) => res.json());

fetchResult.then((data) => degree.append(Math.floor(data.main.temp - 273.15)));
fetchResult.then((data) => aboutSun.append(data.weather[0].description));
fetchResult.then((data) => windSpeed.append(`${data.wind.speed} m/s`));

// GitHub Info

const user = document.querySelector(".header__user");
const modal = document.querySelector(".pop-up");
const closeBtn = document.querySelector(".pop-up__close");
const headerUserName = document.querySelector(".header__user__name");
const userName = document.querySelector(".pop-up__header__name");
const aboutUser = document.querySelector(".pop-up__header__subTitle");
const userPhoto = document.querySelector(".pop-up__header__img");
const linkedin = document.querySelector(".linkedin");
const github = document.querySelector(".github");
const email = document.querySelector(".email");
const userLocation = document.querySelector(".pop-up__location__value");

const urlGit = "https://api.github.com/users/LizavetaLazarchyk";
const gitFetchResult = fetch(urlGit).then((res) => res.json());
// gitFetchResult.then(data => console.log(data));
gitFetchResult.then((data) => userName.append(data.name));
gitFetchResult.then((data) => headerUserName.append(data.name));
gitFetchResult.then((data) => aboutUser.append(data.bio));
gitFetchResult.then((data) => userLocation.append(data.location));
gitFetchResult.then((data) => userPhoto.setAttribute("src", data.avatar_url));
gitFetchResult.then((data) => linkedin.setAttribute("href", data.blog));
gitFetchResult.then((data) => github.setAttribute("href", data.html_url));
gitFetchResult.then((data) => email.setAttribute("href", data.email));

user.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// ChangeBackground
const ChangeBackground = document.querySelector(".header__change");
const body = document.querySelector("body");

const flickrKey = "0e1da5c6c7a027c7f38faa3a8bdf1787";
const flickrTags = "sunset, nature, sunrise";
const urlFlickr = `https://www.flickr.com//services/rest/?method=flickr.photos.search&api_key=${flickrKey}&tags=${flickrTags}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`;

const flickrFetchResult = fetch(urlFlickr).then((res) => res.json());
flickrFetchResult.then((data) => console.log(data));

flickrFetchResult.then((data) => {
    let photoIndex = 0;
    ChangeBackground.addEventListener("click", () => {
        body.style.backgroundImage = `url(${data.photos.photo[photoIndex].url_h})`;
        photoIndex++;
    });
});
