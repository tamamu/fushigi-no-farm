
// ES6 Test Class

export default class Test {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  text() {
    console.log(`x=${this.x}, y=${this.y}`);
  }
}
