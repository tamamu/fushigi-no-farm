/*
    Harvest - Fushigi no Farm -
    Version: 0.1.0

    Copyright (C) 2016 Tamamu (https://tamamu.github.io)
*/

import PIXI from 'pixi.js';
import InputReceiver from './InputReceiver';
import Actor from './Actor';

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
  window.onresize = onResize;

  stage = new PIXI.Container();
  player = new Actor(
    'images/chara0.png',
    window.innerWidth / 2,
    window.innerHeight / 2
  );

  stage.addChild(player.sprite);

  animate();
}

function onResize(event) {
  renderer.resize(window.innerWidth, window.innerHeight);
}

function init() {
  // document.onkeydown = InputReceiver.receiveKeyDown;
  // document.onkeyup = InputReceiver.receiveKeyUp;
  InputReceiver.init();
  PIXI.loader.add('images/chara0.png');
  PIXI.loader.once('complete', onAssetsLoaded);
  PIXI.loader.load();
}

init();
