$(document).ready(function () {
  const anim = [
    "floater",
    "pulse",
    "rotation",
    "sideToSide",
    "spinner",
    "wiggle",
  ];
  const images = [
    { img: "a.jpg", width: 1333, height: 2000 },
    { img: "b.JPG", width: 2000, height: 3000 },
    { img: "c.JPG", width: 2000, height: 3000 },
    { img: "d.jpg", width: 2000, height: 3000 },
    { img: "e.jpg", width: 3000, height: 2000 },
    { img: "f.jpg", width: 2000, height: 3000 },
    { img: "g.jpg", width: 2000, height: 3000 },
    { img: "h.jpg", width: 2000, height: 3000 },
    { img: "i.jpg", width: 2800, height: 2000 },
    { img: "j.jpg", width: 3000, height: 2000 },
  ];
  const len = anim.length;
  var $window = $(window),
    ww = $window.width(),
    wh = $window.height(),
    minW = ww / 2 - 150,
    maxW = ww / 2;
  function getSize(width, height) {
    let w = Math.floor(Math.random() * (maxW - minW) + minW);
    let ratio = height / width;
    let h = w * ratio;
    return { width: w, height: h };
  }

  function addMasks(i, w, h) {
    let numMasks = Math.floor(Math.random() * 20);
    let masks = [];

    for (let i = 0; i < numMasks + 1; i++) {
      let maskType = Math.floor(Math.random() * 3);
      let x = Math.random() * w;
      let y = Math.random() * h;
      let r = Math.floor(Math.random() * (w / 2 - w / 10) + w / 10);
      let circle = `<circle fill="#fff" cx="${x}" cy="${y}" r="${r}" filter="url(#filter-${i}) "/>`;
      masks.push(circle);

      // switch (maskType) {
      //   case 1:
      //     let x = (Math.random() * w) / 2;
      //     let y = (Math.random() * h) / 2;
      //     //let r = (Math.random() * w) / 2;
      //     let circle = `<circle fill="#fff" cx="${x}" cy="${y}" r="${x}" filter="url(#filter-{$i}) "/>`;
      //     masks.push(circle);
      //     break;

      //   case 2:
      //     let rect = `<circle fill="#fff" cx="${x}" cy="${y}" r="${x}" filter="url(#filter-{$i}) "/>`;
      //     masks.push(rect);
      //     break;

      //   case 3:
      //     let sq = `<circle fill="#fff" cx="${x}" cy="${y}" r="${x}" filter="url(#filter-{$i}) "/>`;
      //     masks.push(sq);
      //     break;
      // }
    }

    return masks;
  }

  function removeMasks() {}

  const $flex = $(".flex");
  for (let i = 0; i < images.length; i++) {
    let size = getSize(images[i].width, images[i].height);
    let masks = addMasks(i, size.width, size.height);
    let randBlur = Math.floor(Math.random() * (50 - 8) + 8);
    var SVG1 = `<div class="imageContainer"><svg
    id="svg-${i}"
    class="image"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="${size.width}"
    height="${size.height}"
  >
    <defs>
      <filter id="filter-${i}">
        <feGaussianBlur stdDeviation="${randBlur}" />
      </filter>
      <mask id="mask-${i}">`;
    var SVG2 = ``;
    for (let j = 0; j < masks.length; j++) {
      console.log(masks[j]);
      SVG2 += masks[j];
    }
    var SVG3 = `
      </mask>
    </defs>
  
    <image
      x="0"
      y="0"
      xlink:href="images/${images[i].img}"
      width="${size.width}"
      height="${size.height}"
      mask="url(#mask-${i})"
    ></image>
  </svg></div>`;

    var SVGHTML = SVG1 + SVG2 + SVG3;

    $flex.prepend(SVGHTML);
  }

  inView(".imageContainer")
    .on("enter", (el) => {
      let rand = anim[Math.floor(Math.random() * len)];
      el.className = `in-view ${rand}`;
    })
    .on("exit", (el) => {
      //
    });

  inView.offset(-250);
});
