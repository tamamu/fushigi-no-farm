import Key from './Key';
import Input from './Input';

function receiveKeyDown(ev) {
  switch (ev.keyCode) {
    case 37:
      Input.set(Key.LEFT, true);
      break;
    case 38:
      Input.set(Key.UP, true);
      break;
    case 39:
      Input.set(Key.RIGHT, true);
      break;
    case 40:
      Input.set(Key.DOWN, true);
      break;
    default:
      break;
  }
}

function receiveKeyUp(ev) {
  switch (ev.keyCode) {
    case 37:
      Input.set(Key.LEFT, false);
      break;
    case 38:
      Input.set(Key.UP, false);
      break;
    case 39:
      Input.set(Key.RIGHT, false);
      break;
    case 40:
      Input.set(Key.DOWN, false);
      break;
    default:
      break;
  }
}

function init() {
  document.onkeydown = receiveKeyDown;
  document.onkeyup = receiveKeyUp;
}

export default { init };
