/*
    Harvest - Fushigi no Farm -
    Version: 0.1.0

    Copyright (C) 2016 Tamamu (https://tamamu.github.io)
*/

import * as PIXI from 'pixi.js';

class Player {
  constructor(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
  animate() {
    this.x += 5;

    if (this.x > window.innerWidth) {
      this.x = 0;
    }

    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}

const renderer = new PIXI.autoDetectRenderer(
  window.innerWidth,
  window.innerHeight,
  {
    antialias: true,
    autoResize: true,
    transparent: true,
    resolution: 2
  }
);

document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

const base = new PIXI.BaseTexture.fromImage('images/chara0.png');
const tex = new PIXI.Texture(base, new PIXI.Rectangle(0, 0, 32, 48));

const sprite = new PIXI.Sprite(tex);
const player = new Player(
  sprite,
  window.innerWidth / 2,
  window.innerHeight / 2
);

stage.addChild(sprite);


function animate() {
  requestAnimationFrame(animate);

  player.animate();

  renderer.render(stage);
}

animate();
