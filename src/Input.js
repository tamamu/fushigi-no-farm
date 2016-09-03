import Key from './Key';

class Input {
  constructor() {
    this.map = new Map([
      [Key.UP, false],
      [Key.DOWN, false],
      [Key.LEFT, false],
      [Key.RIGHT, false]
    ]);
  }

  set(key, value) {
    return this.map.set(key, value);
  }

  get(key) {
    return this.map.get(key);
  }
}


export default new Input();
