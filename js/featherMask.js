$(document).ready(function () {
  var img = SVG("#image0");
  console.log(img);
  var circles = SVG("#image0 #mask0").children();
  circles.each(function (i, children) {
    this.attr("data-cx", this.attr("cx"));
    this.attr("data-cy", this.attr("cy"));

    //console.log(this.attr("cx"));
    //this.animate({ duration: 2000 }).move(newX - 120, newY - 50);
  });

  setInterval(function () {
    circles.each(function (i, children) {
      let x = this.attr("data-cx");
      let y = this.attr("data-cy");
      let maxX = x + 50;
      let maxY = y + 50;
      let minX = x - 50;
      let minY = y - 50;
      let newX = Math.random() * (maxX - minX) + minX;
      let newY = Math.random() * (maxY - minY) + minY;

      this.attr("cx", newX);
      this.attr("cy", newY);
      let speed = Math.random() * (5000 - 2000) + 2000;
      this.style.transitionDuration = `${speed}s`;

      //console.log(this.attr("cx"));
      //this.animate({ duration: 2000 }).move(newX - 120, newY - 50);
    });
  }, 4000);
  return true;
  const anim = [
    "floater",
    "pulse",
    "rotation",
    "sideToSide",
    "spinner",
    "wiggle",
    "pound",
    "heartBeat",
  ];
  const introAnim = [
    "rollerRight",
    "rollerLeft",
    "zoomer",
    "slideUp",
    "slideDown",
    "bounceIn",
    "slideLeft",
    "slideRight",
    "rotateInRight",
    "rotateInLeft",
    "fadeIn",
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
  const lenIntro = introAnim.length;
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
    let numMasks = Math.floor(Math.random() * 200);
    let masks = [];
    let maxRectW = w - 100;
    let maxRectH = w - 100;
    let minRectW = maxRectW / 2;
    let minRectH = maxRectH / 2;
    let rectW = Math.random() * (maxRectW - minRectW) + minRectW;
    let rectH = Math.random() * (maxRectH - minRectH) + minRectH;
    let rounded = Math.random() * (20 - 15) + 15;
    let rect = `<rect fill="white" x="50" y="50" width="${rectW}" height="${rectH}" rx="${rounded}"  filter="url(#filter-${i})" />`;
    masks.push(rect);
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
    let randBlur = Math.floor(Math.random() * (20 - 8) + 8);
    var SVG1 = `<div class="introImageContainer"><div class="imageContainer"><svg
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
  </svg></div></div>`;

    var SVGHTML = SVG1 + SVG2 + SVG3;

    $flex.prepend(SVGHTML);
  }

  function pushContainer(el) {
    let x = Math.floor(Math.random() * (80 - 40) + -40);
    let y = Math.floor(Math.random() * (80 - 40) + -40);
    $(el).css("transform", `translate(${x}%, ${y}%)`);
  }

  inView(".imageContainer")
    .on("enter", (el) => {
      let rand = anim[Math.floor(Math.random() * len)];
      el.className = `imageContainer in-view ${rand}`;
    })
    .on("exit", (el) => {
      //
    });

  inView(".introImageContainer")
    .on("enter", (el) => {
      let rand = introAnim[Math.floor(Math.random() * lenIntro)];
      el.className = `introImageContainer in-view ${rand}`;
      //pushContainer(el);
    })
    .on("exit", (el) => {
      //
    });

  inView.offset(-250);
});
