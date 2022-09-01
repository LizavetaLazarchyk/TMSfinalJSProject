const urlWeater =
  "https://api.openweathermap.org/data/2.5/weather?lat=53.8966111&lon=27.5503887&appid=165c8926906419f045ed06a58d33d5bd";
export const fetchResultWeather = fetch(urlWeater).then((res) => res.json());

const flickrKey = "0e1da5c6c7a027c7f38faa3a8bdf1787";
const flickrTags = "sunset, nature, sunrise";
const urlFlickr = `https://www.flickr.com//services/rest/?method=flickr.photos.search&api_key=${flickrKey}&tags=${flickrTags}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`;
export const flickrFetchResult = fetch(urlFlickr).then((res) => res.json());

const urlGit = "https://api.github.com/users/LizavetaLazarchyk";
export const gitFetchResult = fetch(urlGit).then((res) => res.json());
