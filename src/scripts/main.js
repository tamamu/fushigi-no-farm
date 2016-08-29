/*
    Harvest - Fushigi no Farm -
    Version: 0.1.0

    Copyright (C) 2016 Tamamu (https://tamamu.github.io)
*/

class Player {
  constructor(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
  animate(state) {
    this.x += 5;
    this.sprite.rotation += 0.01;

    if (this.x > window.innerWidth) {
      this.x = 0;
    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}

let renderer = new PIXI.autoDetectRenderer(
  window.innerWidth,
  window.innerHeight,
  {
    "antialias": true,
    "autoResize": true,
    "transparent": true,
    "resolution": 2
  }
);

document.body.appendChild(renderer.view);

let stage = new PIXI.Container();

let sprite = new PIXI.Sprite.fromImage("images/chara0.png");
let player = new Player (
  sprite,
  window.innerWidth / 2,
  window.innerHeight / 2
);
let state = {
    "renderer": renderer,
    "stage": stage
}

stage.addChild(sprite);

animate();

function animate() {
  requestAnimationFrame(animate);

  player.animate(state)

  renderer.render(stage);
}
