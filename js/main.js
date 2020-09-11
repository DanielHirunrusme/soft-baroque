$(document).ready(function () {
  var blobs = [],
    winW = $(window).width(),
    winH = $(window).height();

  function winResize() {
    $("svg").removeAttr("viewBox");
    $("svg").each(function () {
      let $parent = $(this).parent();
      let w = $parent.width();
      let h = $parent.height();
      $(this)[0].setAttribute("viewBox", `0 0 ${w} ${h}`);
    });

    //sizes
    winW = $(window).width();
    winH = $(window).height();
  }

  winResize();

  $("svg").each(function () {
    let id = $(this).find("path").attr("id"),
      $parent = $(this).parent();

    var blob = createBlob({
      element: document.querySelector(`#${id}`),
      numPoints: 12,
      centerX: $parent.width() / 2,
      centerY: $parent.height() / 2,
      minRadius: $parent.width() / 2,
      maxRadius: $parent.width(),
      minDuration: 4,
      maxDuration: 8,
    });

    TweenMax.to(blob.tl, 1, {
      timeScale: 1,
      onStart() {
        blob.tl.play();
      },
    });

    blobs.push(blob);
  });

  function createBlob(options) {
    const points = [];
    const path = options.element;
    const slice = (Math.PI * 2) / options.numPoints;
    const startAngle = random(Math.PI * 2);

    const tl = new TimelineMax({
      onUpdate: update,
      paused: true,
    });

    for (let i = 0; i < options.numPoints; i++) {
      const angle = startAngle + i * slice;
      const duration = random(options.minDuration, options.maxDuration);

      const point = {
        x: options.centerX + Math.cos(angle) * options.minRadius,
        y: options.centerY + Math.sin(angle) * options.minRadius,
      };

      const tween = TweenMax.to(point, duration, {
        x: options.centerX + Math.cos(angle) * options.maxRadius,
        y: options.centerY + Math.sin(angle) * options.maxRadius,
        repeat: -1,
        yoyo: true,
        ease: Sine.easeInOut,
      });

      tl.add(tween, -random(duration));
      points.push(point);
    }

    options.tl = tl;
    options.points = points;

    tl.progress(1).progress(0).timeScale(0);
    update();

    function update() {
      //console.log("UPDATE", ct++);
      path.setAttribute("d", cardinal(points, true, 1));
    }

    return options;
  }

  // Cardinal spline - a uniform Catmull-Rom spline with a tension option
  function cardinal(data, closed, tension) {
    if (data.length < 1) return "M0 0";
    if (tension == null) tension = 1;

    let size = data.length - (closed ? 0 : 1);
    let path = "M" + data[0].x + " " + data[0].y + " C";

    for (let i = 0; i < size; i++) {
      let p0, p1, p2, p3;

      if (closed) {
        p0 = data[(i - 1 + size) % size];
        p1 = data[i];
        p2 = data[(i + 1) % size];
        p3 = data[(i + 2) % size];
      } else {
        p0 = i == 0 ? data[0] : data[i - 1];
        p1 = data[i];
        p2 = data[i + 1];
        p3 = i == size - 1 ? p2 : data[i + 2];
      }

      let x1 = p1.x + ((p2.x - p0.x) / 6) * tension;
      let y1 = p1.y + ((p2.y - p0.y) / 6) * tension;

      let x2 = p2.x - ((p3.x - p1.x) / 6) * tension;
      let y2 = p2.y - ((p3.y - p1.y) / 6) * tension;

      path +=
        " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
    }

    return closed ? path + "z" : path;
  }

  function random(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    if (min > max) {
      var tmp = min;
      min = max;
      max = tmp;
    }
    return min + (max - min) * Math.random();
  }

  $(window).on("resize", winResize);
  winResize();
});
