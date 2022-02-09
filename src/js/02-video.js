import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');

const player = new Player(iframe);

//? при использовании Nullish coalescing operator (??) при билде выдает ошибку
// player.setCurrentTime(localStorage.getItem(TIME_KEY)) ?? true;

//при первом запуске плеера localStorage.getItem(TIME_KEY) === null
if (localStorage.getItem(TIME_KEY) === null || localStorage.getItem(TIME_KEY) === undefined) {
  player.setCurrentTime(0);
} else {
  player.setCurrentTime(localStorage.getItem(TIME_KEY));
}

player.setMuted(true);

player.on('timeupdate', throttle(timeLocalStorageHandler, 1000));

function timeLocalStorageHandler(data) {
  try {
    localStorage.setItem(TIME_KEY, data.seconds);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
