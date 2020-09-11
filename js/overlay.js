// This is demo of pixi-picture.js, https://github.com/pixijs/pixi-picture
// Plugin automatically assigns a filter for every sprite that has special blendModes

const app = new PIXI.Application({
  backgroundColor: 0xffffff,
  autoResize: true,
  resolution: devicePixelRatio,
});
document.body.appendChild(app.view);
app.renderer.resize(window.innerWidth, window.innerHeight);

// create a new background sprite
const background = PIXI.Sprite.from(
  "https://danielhirunrusme.github.io/soft-baroque/images/a.jpg"
);
background.width = window.innerWidth;
background.height = window.innerHeight;
renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
//app.backgroundColor = 0xffff00;

// filter can only use copyTex and not readPixels, so you have to make sure that
// you actually have a backbuffer that is managable by pixi renderer
app.stage.filters = [new PIXI.filters.AlphaFilter()];
app.stage.filterArea = app.screen;
//app.stage.backgroundColor = 0xffff00;

// create an array to store a reference to the dudes
const dudeArray = [];

const totaldudes = 2;
const texture = PIXI.Texture.from(
  "https://danielhirunrusme.github.io/soft-baroque/images/a.jpg"
);

const textures = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

for (let i = 0; i < textures.length; i++) {
  // create a new Sprite that uses the image name that we just generated as its source
  let tex = textures[i];
  const texture = PIXI.Texture.from(
    `https://danielhirunrusme.github.io/soft-baroque/images/${tex}.jpg`
  );
  const dude = new PIXI.picture.Sprite(texture);
  dude.backgroundColor = 0xffffff;
  dude.anchor.set(0.5);

  // set a random scale for the dude
  dude.scale.set(0.05 + Math.random() * 0.05);

  // finally let's set the dude to be at a random position...
  dude.x = Math.floor(Math.random() * app.screen.width);
  dude.y = Math.floor(Math.random() * app.screen.height);

  // The important bit of this example, this is how you change the default blend mode of the sprite
  const num = (Math.random() * 3) | 0;
  if (num === 0) {
    //dude.blendMode = PIXI.BLEND_MODES.HARD_LIGHT;
    //dude.blendMode = PIXI.BLEND_MODES.LUMINOSITY;
  } else if (num === 1) {
    //dude.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT;
    //dude.blendMode = PIXI.BLEND_MODES.OVERLAY;
    //dude.blendMode = PIXI.BLEND_MODES.LUMINOSITY;
  } else if (num === 2) {
    //dude.blendMode = PIXI.BLEND_MODES.OVERLAY;
    //dude.blendMode = PIXI.BLEND_MODES.LUMINOSITY;
  }
  dude.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT;

  // create some extra properties that will control movement
  dude.direction = Math.random() * Math.PI * 2;

  // this number will be used to modify the direction of the dude over time
  dude.turningSpeed = Math.random() - 0.8;

  // create a random speed for the dude between 0 - 2
  dude.speed = 1 + Math.random() * 0.5;

  // finally we push the dude into the dudeArray so it it can be easily accessed later
  dudeArray.push(dude);

  app.stage.addChild(dude);
}

// create a bounding box box for the little dudes
const dudeBoundsPadding = 100;

const dudeBounds = new PIXI.Rectangle(
  -dudeBoundsPadding,
  -dudeBoundsPadding,
  app.screen.width + dudeBoundsPadding * 2,
  app.screen.height + dudeBoundsPadding * 2
);

app.ticker.add(() => {
  // iterate through the dudes and update the positions
  for (let i = 0; i < dudeArray.length; i++) {
    const dude = dudeArray[i];
    dude.direction += dude.turningSpeed * 0.01;
    dude.x += Math.sin(dude.direction) * dude.speed;
    dude.y += Math.cos(dude.direction) * dude.speed;
    dude.rotation = -dude.direction - Math.PI / 2;

    // wrap the dudes by testing their bounds...
    if (dude.x < dudeBounds.x) {
      dude.x += dudeBounds.width;
    } else if (dude.x > dudeBounds.x + dudeBounds.width) {
      dude.x -= dudeBounds.width;
    }

    if (dude.y < dudeBounds.y) {
      dude.y += dudeBounds.height;
    } else if (dude.y > dudeBounds.y + dudeBounds.height) {
      dude.y -= dudeBounds.height;
    }
  }
});
