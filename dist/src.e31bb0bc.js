// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"modules/createNewTasks.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodo = createTodo;
exports.taskList = void 0;
var taskList = document.querySelector(".tasks__list");
exports.taskList = taskList;

function createTodo(id, description, isCompleted, date, time) {
  var li = document.createElement("li");
  var input = document.createElement("input");
  var label = document.createElement("label");
  var timeInfo = document.createElement("p");
  var dateCreation = document.createElement("p");
  var timeCreation = document.createElement("p");
  var button = document.createElement("button");
  li.className = isCompleted ? "tasks__item done" : "tasks__item";
  li.append(input, label, timeInfo, button);
  li.dataset.id = id;
  label.append(description);
  label.className = "tasks__item__label";
  input.type = "checkbox";
  input.className = "tasks__item__checkbox";
  input.checked = isCompleted;
  input.dataset.action = "done";
  input.id = "tasks__checkbox-".concat(li.dataset.id);
  label.setAttribute("for", input.id);
  timeInfo.className = "tasks__item__info";
  timeInfo.append(dateCreation, timeCreation);
  dateCreation.append(date);
  dateCreation.className = "tasks__item__date";
  timeCreation.append(time);
  timeCreation.className = "tasks__item__time";
  button.className = "tasks__item__btn-delete";
  button.innerHTML = "\n    <svg\n    data-action = \"remove\"\n    class=\"tasks__item__svg-delete\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 12 16\">\n    <path\n    fill-rule=\"evenodd\"\n    d=\"M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z\"\n    />\n    </svg>\n    ";
  return li;
}
},{}],"modules/getDatas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gitFetchResult = exports.flickrFetchResult = exports.fetchResultWeather = void 0;
var urlWeater = "https://api.openweathermap.org/data/2.5/weather?lat=53.8966111&lon=27.5503887&appid=165c8926906419f045ed06a58d33d5bd";
var fetchResultWeather = fetch(urlWeater).then(function (res) {
  return res.json();
});
exports.fetchResultWeather = fetchResultWeather;
var flickrKey = "0e1da5c6c7a027c7f38faa3a8bdf1787";
var flickrTags = "sunset, nature, sunrise";
var urlFlickr = "https://www.flickr.com//services/rest/?method=flickr.photos.search&api_key=".concat(flickrKey, "&tags=").concat(flickrTags, "&tag_mode=all&extras=url_h&format=json&nojsoncallback=1");
var flickrFetchResult = fetch(urlFlickr).then(function (res) {
  return res.json();
});
exports.flickrFetchResult = flickrFetchResult;
var urlGit = "https://api.github.com/users/LizavetaLazarchyk";
var gitFetchResult = fetch(urlGit).then(function (res) {
  return res.json();
});
exports.gitFetchResult = gitFetchResult;
},{}],"modules/createdateInfo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDate = createDate;
exports.createManeTime = createManeTime;
exports.createMonth = createMonth;
exports.createWeekDay = createWeekDay;

function createManeTime() {
  return new Date().toLocaleTimeString();
}

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function createWeekDay() {
  var dayNum = new Date().getDay();
  return days[dayNum];
}

var monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function createMonth() {
  var monthNum = new Date().getMonth();
  return monthes[monthNum];
}

function createDate() {
  return new Date().getDate();
}
},{}],"modules/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderBackgroundImg = renderBackgroundImg;
exports.renderDateInfo = renderDateInfo;
exports.renderGitInfo = renderGitInfo;
exports.renderToDo = renderToDo;
exports.renderWeather = renderWeather;
exports.todos = void 0;

var _createNewTasks = require("./createNewTasks.js");

var _getDatas = require("./getDatas.js");

var _createdateInfo = require("./createdateInfo");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var todos = [];
exports.todos = todos;

function renderToDo() {
  if (localStorage.getItem("todos")) {
    var data = JSON.parse(localStorage.getItem("todos"));
    todos.push.apply(todos, _toConsumableArray(data));
  }

  var todoItems = todos.map(function (item) {
    var li = (0, _createNewTasks.createTodo)(item.id, item.description, item.isCompleted, item.date, item.time);
    return li;
  });

  _createNewTasks.taskList.append.apply(_createNewTasks.taskList, _toConsumableArray(todoItems));
}

var degree = document.querySelector(".info__weather__degree");
var aboutSun = document.querySelector(".info__weather__sun");
var windSpeed = document.querySelector(".info__weather__wind__value");

function renderWeather() {
  _getDatas.fetchResultWeather.then(function (data) {
    return degree.append(Math.floor(data.main.temp - 273.15));
  });

  _getDatas.fetchResultWeather.then(function (data) {
    return aboutSun.append(data.weather[0].description);
  });

  _getDatas.fetchResultWeather.then(function (data) {
    return windSpeed.append("".concat(data.wind.speed, " m/s"));
  });
}

var ChangeBackground = document.querySelector(".header__change");
var body = document.querySelector("body");

function renderBackgroundImg() {
  var photoIndex = 3;

  _getDatas.flickrFetchResult.then(function (data) {
    ChangeBackground.addEventListener("click", function () {
      body.style.backgroundImage = "url(".concat(data.photos.photo[photoIndex].url_h, ")");
      photoIndex++;
    });
  });
}

var headerUserName = document.querySelector(".header__user__name");
var userName = document.querySelector(".pop-up__header__name");
var aboutUser = document.querySelector(".pop-up__header__subTitle");
var userPhoto = document.querySelector(".pop-up__header__img");
var linkedin = document.querySelector(".linkedin");
var github = document.querySelector(".github");
var email = document.querySelector(".email");
var userLocation = document.querySelector(".pop-up__location__value");
var headerUserPhoto = document.querySelector(".header__user__img");

function renderGitInfo() {
  _getDatas.gitFetchResult.then(function (data) {
    return userName.append(data.name);
  });

  _getDatas.gitFetchResult.then(function (data) {
    return headerUserName.append(data.name);
  });

  _getDatas.gitFetchResult.then(function (data) {
    return aboutUser.append(data.bio);
  });

  _getDatas.gitFetchResult.then(function (data) {
    return userLocation.append(data.location);
  });

  _getDatas.gitFetchResult.then(function (data) {
    return userPhoto.setAttribute("src", data.avatar_url);
  });

  _getDatas.gitFetchResult.then(function (data) {
    return headerUserPhoto.setAttribute("src", data.avatar_url);
  });

  _getDatas.gitFetchResult.then(function (data) {
    return linkedin.setAttribute("href", data.blog);
  });

  _getDatas.gitFetchResult.then(function (data) {
    return github.setAttribute("href", data.html_url);
  });

  _getDatas.gitFetchResult.then(function (data) {
    return email.setAttribute("href", data.email);
  });
}

var infoTime = document.querySelector(".header__time");
var infoWeekDay = document.querySelector(".info__date__week-day");
var infoMonth = document.querySelector(".info__date__month");
var infoDay = document.querySelector(".info__date__num");

function renderDateInfo() {
  setInterval(function () {
    return infoTime.innerHTML = (0, _createdateInfo.createManeTime)();
  }, 1000);
  infoWeekDay.append((0, _createdateInfo.createWeekDay)());
  infoMonth.append((0, _createdateInfo.createMonth)());
  infoDay.append((0, _createdateInfo.createDate)());
}
},{"./createNewTasks.js":"modules/createNewTasks.js","./getDatas.js":"modules/getDatas.js","./createdateInfo":"modules/createdateInfo.js"}],"modules/addEventlisteners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listenersFilters = listenersFilters;
exports.listenersMofal = listenersMofal;
exports.listenersToDo = listenersToDo;

var _createNewTasks = require("./createNewTasks.js");

var _render = require("./render.js");

var newTasks = document.querySelector("#new");
var oldTasks = document.querySelector("#old");
var doneTasks = document.querySelector("#done");
var notDoneTasks = document.querySelector("#notDone");
var taskItem = document.querySelectorAll(".tasks__item");

function listenersFilters() {
  doneTasks.addEventListener("input", function () {
    _createNewTasks.taskList.style.flexDirection = "column";
    taskItem.forEach(function (task) {
      if (!task.className.includes("done")) {
        task.style.order = "2";
      } else {
        task.style.order = "1";
      }
    });
  });
  notDoneTasks.addEventListener("input", function () {
    _createNewTasks.taskList.style.flexDirection = "column";
    taskItem.forEach(function (task) {
      if (!task.className.includes("done")) {
        task.style.order = "1";
      } else {
        task.style.order = "2";
      }
    });
  });
  oldTasks.addEventListener("input", function () {
    taskItem.forEach(function (task) {
      task.style.order = "0";
    });
    _createNewTasks.taskList.style.flexDirection = "column";
  });
  newTasks.addEventListener("input", function () {
    taskItem.forEach(function (task) {
      task.style.order = "0";
    });
    _createNewTasks.taskList.style.flexDirection = "column-reverse";
  });
}

var newTaskInput = document.querySelector(".add-task__input");
var newTaskBtn = document.querySelector(".add-task__btn");

function listenersToDo() {
  newTaskInput.addEventListener("input", function (event) {
    newTaskBtn.disabled = event.currentTarget.value === "";
  });
  newTaskBtn.addEventListener("click", function () {
    var todo = {
      id: _render.todos.length >= 1 ? _render.todos.at(-1).id + 1 : 1,
      description: newTaskInput.value,
      isCompleted: false,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().slice(0, -3)
    };
    newTaskInput.value = "";
    newTaskBtn.disabled = true;
    var newTodoItem = (0, _createNewTasks.createTodo)(todo.id, todo.description, todo.isCompleted, todo.date, todo.time);

    _createNewTasks.taskList.append(newTodoItem);

    _render.todos.push(todo);

    var jsonTodos = JSON.stringify(_render.todos);
    localStorage.setItem("todos", jsonTodos);
  });

  _createNewTasks.taskList.addEventListener("click", function (event) {
    switch (event.target.dataset.action) {
      case "remove":
        {
          var li = event.target.closest(".tasks__item");
          li.remove();

          var index = _render.todos.findIndex(function (todo) {
            return todo.id === +li.dataset.id;
          });

          _render.todos.splice(index, 1);

          localStorage.setItem("todos", JSON.stringify(_render.todos));
          break;
        }

      case "done":
        {
          var _li = event.target.closest(".tasks__item");

          _li.classList.toggle("done");

          var todo = _render.todos.find(function (todo) {
            return todo.id === +_li.dataset.id;
          });

          todo.isCompleted = !todo.isCompleted;
          localStorage.setItem("todos", JSON.stringify(_render.todos));
          break;
        }

      default:
        break;
    }
  });
}

var user = document.querySelector(".header__user");
var modal = document.querySelector(".pop-up");
var closeBtn = document.querySelector(".pop-up__close");

function listenersMofal() {
  user.addEventListener("click", function () {
    modal.style.display = "block";
  });
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });
}
},{"./createNewTasks.js":"modules/createNewTasks.js","./render.js":"modules/render.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _render = require("./modules/render.js");

var _addEventlisteners = require("./modules/addEventlisteners.js");

(0, _render.renderToDo)();
(0, _render.renderWeather)();
(0, _render.renderBackgroundImg)();
(0, _render.renderGitInfo)();
(0, _render.renderDateInfo)();
(0, _addEventlisteners.listenersFilters)();
(0, _addEventlisteners.listenersToDo)();
(0, _addEventlisteners.listenersMofal)();
},{"./modules/render.js":"modules/render.js","./modules/addEventlisteners.js":"modules/addEventlisteners.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64512" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map