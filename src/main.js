/*
    Harvest - Fushigi no Farm -
    Version: 0.1.0

    Copyright (C) 2016 Tamamu (https://tamamu.github.io)
*/

import PIXI from 'pixi.js';
import Test from './Test';

class Player {
  constructor(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
  animate() {

    if (this.x > window.innerWidth) {
      this.x = 0;
    }

  }
}


function getFrames(imagePath, frameWidth, frameHeight, frameNum = null) {
  const texture = PIXI.utils.TextureCache[imagePath].baseTexture;
  const framesContainer = [];
  const fx = texture.width / frameWidth;
  const fy = texture.height / frameHeight;
  const frames = [];
  for (let i = 0; i < fy; i++) {
    for (let j = 0; j < fx; j++) {
      const t = new PIXI.Texture(texture);
      t.frame = new PIXI.Rectangle(j * frameWidth, i * frameHeight, frameWidth, frameHeight);
      frames.push(t);
    }
  }
  if (frameNum) {
    let fidx = 0;
    let num = 0;
    while (fidx * frameNum < frames.length) {
      framesContainer[fidx] = [];
      for (num = 0; num < frameNum; num++) {
        framesContainer[fidx].push(frames[(fidx * frameNum) + num]);
      }
      fidx++;
    }
  } else {
    framesContainer.push(frames);
  }
  return framesContainer;
}

function getFramesByLayout(imagePath, frameWidth, frameHeight, frameNum, layout) {
  const texture = PIXI.utils.TextureCache[imagePath].baseTexture;
  const framesContainer = [];
  const fx = texture.width / frameWidth;
  const fy = texture.height / frameHeight;
  const fw = frameWidth * frameNum;
  const fsx = texture.width / fw;
  const total = (fx * fy) / frameNum;
  for (let i = 0; i < total; i++) {
    const frames = [];
    const nx = i % fsx;
    const ny = (i - nx) / fsx;
    for (let n = 0; n < layout.length; n++) {
      const t = new PIXI.Texture(texture);
      t.frame = new PIXI.Rectangle(
        (nx * fw) + (frameWidth * layout[n]),
        ny * frameHeight,
        frameWidth, frameHeight);
      frames.push(t);
    }
    framesContainer.push(frames);
  }
  return framesContainer;
}

let renderer;
let stage;
let player;

function animate() {
  requestAnimationFrame(animate);

  player.animate();

  renderer.render(stage);
}

function onAssetsLoaded() {
  renderer = new PIXI.autoDetectRenderer(
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

  stage = new PIXI.Container();
  const chara0Frames = getFramesByLayout('images/chara0.png', 32, 48, 3, [0, 1, 2, 1]);
  const chara0N = chara0Frames[0];
  const chara0W = chara0Frames[1];
  const chara0S = chara0Frames[2];
  const chara0E = chara0Frames[3];
  const mc = new PIXI.extras.MovieClip(chara0N);
  mc.position.set(0);
  mc.anchor.set(0.5);
  mc.animationSpeed = 0.1;
  mc.play();
  player = new Player(
    mc,
    window.innerWidth / 2,
    window.innerHeight / 2
  );

  stage.addChild(mc);

  animate();
}


function init() {
  PIXI.loader.add('images/chara0.png');
  PIXI.loader.once('complete', onAssetsLoaded);
  PIXI.loader.load();
}

init();
