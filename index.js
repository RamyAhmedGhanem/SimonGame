$(document).ready(function() {
  //red = 0
  // blue = 1
  // yellow = 2
  // green = 3
  var colors = ["red", "blue", "yellow", "green"];
  var chain = [];
  // var round_number = 1;
  var start = false;
  var pressedColor, colorNumber = -1;
  var delay = 250;
  $(document).keydown(function(e) {
    if (start === false) {
      start = true;
      increaseRound();
    }

  });

  $(".btn").click(function(e) {
    if (start === true) {
      colorNumber++;
      pressedcolor = e.target.id;
      delay = 0;
      illuminateChain(pressedcolor);
      if (pressedcolor !== chain[colorNumber]) {
        start = false;
        colorNumber = 0;
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").css("backgroundColor", "red");//you can use game-over class in CSS instead
        delay = 0;
        setTimeout(function() {
          $("body").css("backgroundColor", "#011F3F");
        }, delay);
        chain.length = 0;
        playAudio("sounds/wrong.mp3");
      } else {
        playAudio("sounds/" + pressedcolor + ".mp3");
        if (colorNumber === (chain.length - 1)) {
          increaseRound();
        }

      }
    }
  });

  function playAudio(src) {
    var sound = new Audio(src);
    sound.play();
  }

  function increaseRound() {
    colorNumber = -1;
    addColor();
    $("#level-title").text("Level " + chain.length);
  }

  function addColor() {
    var color = colors[Math.floor((Math.random() * 4))];
    chain.push(color);
    delay = 250;
    //chain.forEach(illuminateChain);
    chain.forEach(illuminateChainFade);
    delay = 250;
  }
  var today = new Date();

  function illuminateChain(item) {
    // $("#" + item)[0].classList.add("pressed");//excuted when the function this function returns
    setTimeout(function() {
      $("#" + item)[0].classList.add("pressed");
    }, delay);

    delay += 250;

    setTimeout(function() {
      $("#" + item)[0].classList.remove("pressed");
    }, delay);
    delay += 250;
  }

  function illuminateChainFade(item) {
    setTimeout(function() {
      playAudio("sounds/" + item + ".mp3");
      $("#" + item).fadeOut(delay / 2);
      $("#" + item).fadeIn(delay / 2);
    }, delay);

    delay += 250;


  }

});

function wait(ms) {
  var start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}
