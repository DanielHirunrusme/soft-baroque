$(document).ready(function () {
  const anim = [
    "floater",
    "pulse",
    "rotation",
    "sideToSide",
    "spinner",
    "wiggle",
  ];
  const len = anim.length;
  $(".imageContainer").each(function () {
    const $this = $(this);
    const randWidth = (Math.random() * window.innerWidth) / 2 + 200;
    $this.css({ width: randWidth });
    //positionDiv($this);
    /*
    setInterval(function () {
      positionDiv($this);
    }, 4000);
    */
  });

  // inView(".image")
  //   .on("enter", (el) => {
  //     let rand = anim[Math.floor(Math.random() * len)];
  //     let parent = el.parentNode;
  //     el.className = `image in-view`;
  //     parent.className = `imageContainer ${rand}`;
  //   })
  //   .on("exit", (el) => {
  //     let parent = el.parentNode;
  //     el.className = "image";
  //     parent.className = `imageContainer`;
  //   });

  // inView.offset(-250);

  function positionDiv(elem) {
    const x = Math.random() * (100 - 400) + 100;
    const y = Math.random() * (200 - 400) + 200;
    $(elem).css("transform", `translate(${x}px, ${y}px)`);
  }
});
