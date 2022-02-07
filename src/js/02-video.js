import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');

const player = new Player(iframe);

player.setCurrentTime(localStorage.getItem(TIME_KEY)) ?? true;

player.setMuted(true);

player.on('timeupdate', throttle(timeLocalStorageHandler, 1000));

// function timeLocalStorageHandler(data) {
//   localStorage.setItem(TIME_KEY, data.seconds);
//   localStorage.getItem(TIME_KEY);
// }

function timeLocalStorageHandler(data) {
  try {
    localStorage.setItem(TIME_KEY, data.seconds);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }

  try {
    localStorage.getItem(TIME_KEY);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
