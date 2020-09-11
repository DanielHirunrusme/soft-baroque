const app = new PIXI.Application({
  backgroundColor: 0xffffff,
  autoResize: true,
  resolution: devicePixelRatio,
});
document.body.appendChild(app.view);
app.renderer.resize(window.innerWidth, window.innerHeight);
// create two render textures... these dynamic textures will be used to draw the scene into itself
let renderTexture = PIXI.RenderTexture.create(
  app.screen.width,
  app.screen.height
);
let renderTexture2 = PIXI.RenderTexture.create(
  app.screen.width,
  app.screen.height
);
const currentTexture = renderTexture;

// create a new sprite that uses the render texture we created above
const outputSprite = new PIXI.Sprite(currentTexture);

// align the sprite
outputSprite.x = 400;
outputSprite.y = 300;
outputSprite.anchor.set(0.5);

// add to stage
app.stage.addChild(outputSprite);

const stuffContainer = new PIXI.Container();

stuffContainer.x = window.innerWidth / 2;
stuffContainer.y = window.innerHeight / 2;

app.stage.addChild(stuffContainer);

// create an array of image ids..
const textures = ["a", "d", "e", "f", "g", "h", "i"];

// create an array of items
const items = [];

// now create some items and randomly position them in the stuff container
for (let i = 0; i < textures.length; i++) {
  let tex = textures[i];
  const item = PIXI.Sprite.from(
    `https://danielhirunrusme.github.io/soft-baroque/images/${tex}.jpg`
  );
  item.x = Math.random() * window.innerWidth;
  item.y = Math.random() * window.innerHeight;
  item.width = 100;
  item.height = 100;
  item.anchor.set(0.5);
  stuffContainer.addChild(item);
  items.push(item);
}

// used for spinning!
let count = 0;

app.ticker.add(() => {
  for (let i = 0; i < items.length; i++) {
    // rotate each item
    const item = items[i];
    item.rotation += 0.1;
  }

  count += 0.01;

  // swap the buffers ...
  const temp = renderTexture;
  renderTexture = renderTexture2;
  renderTexture2 = temp;

  // set the new texture
  outputSprite.texture = renderTexture;

  // twist this up!
  stuffContainer.rotation -= 0.001;
  outputSprite.scale.set(1 + Math.sin(count) * 0.02);

  // render the stage to the texture
  // the 'true' clears the texture before the content is rendered
  app.renderer.render(app.stage, renderTexture2, false);
});
