class Game {
  constructor() {
    this.player = [];
    this.dealer = [];
    this.player_point = [];
    this.dealer_point = [];
  }

  start(main, action, $window) {
    this.hit(main.kard.all, points, "player");
    this.hit(main.kard.all, points, "player");
    this.hit(main.kard.all, points, "dealer");
    this.hit(main.kard.all, points, "dealer");

  }

  interval(main, action, $window, context) {
    action.key_event($window);
    if (action.isHit(main) && (action.key.enter > 0 && action.key.enter != Infinity)){
      action.key.enter = Infinity;
      var result = this.hit(main.kard.all, points, "player");
    }
    if (action.isStand(main) && (action.key.enter > 0 && action.key.enter != Infinity)){
      action.key.enter = Infinity;
      clearInterval(interval);
      var result = this.stand(main, context);
    }

    if (result == "loss"){
      result = "stop";
      clearInterval(interval);
      main.view_result("loss", context);
      for (var i = 0; i < game.player.length; i++){
        main.view_hit(context, i, 200+i*30);
      }

      i = 0;
      main.view_dealer_hit(context, i, 200+i*30, "");
      for (var i = 1; i < game.dealer.length; i++){
        main.view_dealer_hit(context, i, 200+i*30, "back");
      }
    }

    return result;
  }

  hit(kard, points, type) {
    if (type == "player") {
      var rand = Math.floor(Math.random()*kard.length);
      this.player.push(kard.splice(rand, 1));
      this.player_point.push(Number(points.splice(rand, 1)));
      var point = this.calculation_point("player");

      if (point > 21){ return this.but(["player", "loss"]) }
    }else if (type == "dealer"){
      var rand = Math.floor(Math.random()*kard.length);
      this.dealer.push(kard.splice(rand, 1));
      this.dealer_point.push(Number(points.splice(rand, 1)));
      var point = this.calculation_point("dealer");

      if (point > 21){ return this.but(["dealer", "loss"]) }
    }
  }

  calculation_point(type) {
    var number1 = 0;
    var result = 0;
    if (type == "player") {
      for (var i = 0; i < this.player_point.length; i++){
        if (this.player_point[i] == 1){
          number1++;
        }else {
          result += this.player_point[i];
        }
      }

      for (var i = 0; i < number1; i++){
        if (result > 10){
          result += 1;
        }else {
          result += 11;
        }
      }
    }else {
      for (var i = 0; i < this.dealer_point.length; i++){
        if (this.dealer_point[i] == 1){
          number1++;
        }else {
          result += this.dealer_point[i];
        }
      }

      for (var i = 0; i < number1; i++){
        if (result > 10){
          result += 1;
        }else {
          result += 11;
        }
      }
    }

    return result;
  }

  stand(main, context, result) {
    var player = this.calculation_point("player");
    var dealer = this.calculation_point("dealer");

    main.view(context);

    for (var i = 0; i < this.player.length; i++){
      main.view_hit(context, i, 200+i*30);
    }

    for (var i = 0; i < this.dealer.length; i++){
      main.view_dealer_hit(context, i, 200+i*30, "");
    }

    if (dealer < 17){
      var result = this.hit(main.kard.all, points, "dealer");
      return this.stand(main, context, result);
    }

    if (result == "win" || dealer < player){
      main.view_result("win", context);
    }else {
      main.view_result("loss", context);
    }

    return "stop";

  }

  but(type) {
    if (type[0] == "player" && type[1] == "win") {
      return "win"
    }else if (type[0] == "player" && type[1] == "loss") {
      return "loss"
    }else if (type[0] == "dealer" && type[1] == "win") {
      return "loss"
    }else if (type[0] == "dealer" && type[1] == "loss") {
      return "win"
    }
  }
}
