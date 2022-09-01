import {renderToDo, renderWeather, renderBackgroundImg, renderGitInfo, renderDateInfo} from './modules/render.js';
import {listenersFilters, listenersToDo, listenersMofal} from './modules/addEventlisteners.js';

renderToDo();
renderWeather();
renderBackgroundImg();
renderGitInfo();
renderDateInfo();
listenersFilters();
listenersToDo();
listenersMofal();