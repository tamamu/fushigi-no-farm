import PIXI from 'pixi.js';

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

export { getFrames, getFramesByLayout };
