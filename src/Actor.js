import PIXI from 'pixi.js';
import Key from './Key';
import Input from './Input';
import * as PU from './PUtility';

export default class Actor {
  constructor(spriteName, x, y) {
    this.frames = PU.getFramesByLayout(spriteName, 32, 48, 3, [0, 1, 2, 1]);
    const mc = new PIXI.extras.MovieClip(this.frames[0]);
    mc.position.set(0);
    mc.anchor.set(0.5);
    mc.animationSpeed = 0.1;
    mc.gotoAndStop(1);
    this.sprite = mc;
    this.sprite.x = x;
    this.sprite.y = y;
  }
  turnUp() {
    this.sprite.textures = this.frames[6];
  }
  turnDown() {
    this.sprite.textures = this.frames[0];
  }
  turnLeft() {
    this.sprite.textures = this.frames[2];
  }
  turnRight() {
    this.sprite.textures = this.frames[4];
  }
  turnUpLeft() {
    this.sprite.textures = this.frames[5];
  }
  turnUpRight() {
    this.sprite.textures = this.frames[7];
  }
  turnDownLeft() {
    this.sprite.textures = this.frames[1];
  }
  turnDownRight() {
    this.sprite.textures = this.frames[3];
  }
  start() {
    this.sprite.gotoAndPlay(1);
  }
  stop() {
    this.sprite.gotoAndStop(1);
  }
  animate() {
    if (Input.get(Key.UP)) {
      if (Input.get(Key.LEFT)) {
        this.turnUpLeft();
      } else if (Input.get(Key.RIGHT)) {
        this.turnUpRight();
      } else {
        this.turnUp();
      }
    } else if (Input.get(Key.DOWN)) {
      if (Input.get(Key.LEFT)) {
        this.turnDownLeft();
      } else if (Input.get(Key.RIGHT)) {
        this.turnDownRight();
      } else {
        this.turnDown();
      }
    } else if (Input.get(Key.LEFT)) {
      this.turnLeft();
    } else if (Input.get(Key.RIGHT)) {
      this.turnRight();
    }
  }
}

