import { createTodo, taskList } from "./createNewTasks.js";
import {
  fetchResultWeather,
  flickrFetchResult,
  gitFetchResult,
} from "./getDatas.js";
import {
  createWeekDay,
  createManeTime,
  createMonth,
  createDate,
} from "./createdateInfo";

export let todos = [];

export function renderToDo() {
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

  taskList.append(...todoItems);
}

const degree = document.querySelector(".info__weather__degree");
const aboutSun = document.querySelector(".info__weather__sun");
const windSpeed = document.querySelector(".info__weather__wind__value");

export function renderWeather() {
  fetchResultWeather.then((data) =>
    degree.append(Math.floor(data.main.temp - 273.15))
  );
  fetchResultWeather.then((data) =>
    aboutSun.append(data.weather[0].description)
  );
  fetchResultWeather.then((data) => windSpeed.append(`${data.wind.speed} m/s`));
}

const ChangeBackground = document.querySelector(".header__change");
const body = document.querySelector("body");

export function renderBackgroundImg() {
  let photoIndex = 3;
  flickrFetchResult.then((data) => {
    ChangeBackground.addEventListener("click", () => {
      body.style.backgroundImage = `url(${data.photos.photo[photoIndex].url_h})`;
      photoIndex++;
    });
  });
}

const headerUserName = document.querySelector(".header__user__name");
const userName = document.querySelector(".pop-up__header__name");
const aboutUser = document.querySelector(".pop-up__header__subTitle");
const userPhoto = document.querySelector(".pop-up__header__img");
const linkedin = document.querySelector(".linkedin");
const github = document.querySelector(".github");
const email = document.querySelector(".email");
const userLocation = document.querySelector(".pop-up__location__value");

export function renderGitInfo() {
  gitFetchResult.then((data) => userName.append(data.name));
  gitFetchResult.then((data) => headerUserName.append(data.name));
  gitFetchResult.then((data) => aboutUser.append(data.bio));
  gitFetchResult.then((data) => userLocation.append(data.location));
  gitFetchResult.then((data) => userPhoto.setAttribute("src", data.avatar_url));
  gitFetchResult.then((data) => linkedin.setAttribute("href", data.blog));
  gitFetchResult.then((data) => github.setAttribute("href", data.html_url));
  gitFetchResult.then((data) => email.setAttribute("href", data.email));
}

const infoTime = document.querySelector(".header__time");
const infoWeekDay = document.querySelector(".info__date__week-day");
const infoMonth = document.querySelector(".info__date__month");
const infoDay = document.querySelector(".info__date__num");

export function renderDateInfo(){
  setInterval(() => (infoTime.innerHTML = createManeTime()), 1000);
  infoWeekDay.append(createWeekDay());
  infoMonth.append(createMonth());
  infoDay.append(createDate());
}