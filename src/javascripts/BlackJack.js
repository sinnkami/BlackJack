var game;
var interval;
const medal = new Image();
const window_image = new Image();
const kard = {
  all: [],
  back: new Image()
}
const points = [];
for (var i = 0; i < 13; i++){
  kard.all.push(new Image());
  if (i > 9){
    points.push(10);
  }else {
    points.push(i+1);
  }
  kard.all[i].src = `src/images/clover/${i+1}.png`;
}
for (var i = 13; i < 26; i++) {
  kard.all.push(new Image());
  if (i - 13 > 9){
    points.push(10);
  }else {
    points.push(i - 12);
  }
  kard.all[i].src = `src/images/dia/${i+1-13}.png`;
}
for (var i = 26; i < 39; i++) {
  kard.all.push(new Image());
  if (i - 26 > 9){
    points.push(10);
  }else {
    points.push(i - 25);
  }
  kard.all[i].src = `src/images/heart/${i+1-26}.png`;
}
for (var i = 39; i < 52; i++){
  kard.all.push(new Image());
  if (i - 39 > 9){
    points.push(10);
  }else {
    points.push(i - 38);
  }
  kard.all[i].src = `src/images/spade/${i+1-39}.png`;
}

kard.back.src = "src/images/backard.png";
window_image.src = "src/images/window.png";
medal.src = "src/images/medal.png";

$(function (){
  const canvas = $("#canvas")[0];
  const context = canvas.getContext("2d");
  const $window = $(window);

  var main = new Window(window_image, -7, 287, canvas.width + 14, 120, kard);
  var action = new Window_actions();
  game = new Game();

  game.start(main, action, $window);
  interval = setInterval(function () {
    main.age++;
    action.move(main);
    main.view(context);
    var result = game.interval(main, action, $window, context);
    if (result == "stop") { return 0; }
    for (var i = 0; i < game.player.length; i++){
      main.view_hit(context, i, 200+i*30);
    }

    i = 0;
    main.view_dealer_hit(context, i, 200+i*30, "");
    for (var i = 1; i < game.dealer.length; i++){
      main.view_dealer_hit(context, i, 200+i*30, "back");
    }
  }, 1000/60)
})
