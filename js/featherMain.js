$(document).ready(function () {
  $(".flex div").each(function () {
    const $this = $(this);
    const randWidth = (Math.random() * window.innerWidth) / 4 + 200;
    $this.css({ width: randWidth });
    positionDiv($this);
    setInterval(function () {
      positionDiv($this);
    }, 4000);
  });

  document.documentElement.style.setProperty("--your-variable", "#YOURCOLOR");

  function positionDiv(elem) {
    const x = Math.random() * (100 - 400) + 100;
    const y = Math.random() * (200 - 400) + 200;
    $(elem).css("transform", `translate(${x}px, ${y}px)`);
  }
});
