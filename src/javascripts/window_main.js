class Window {
  constructor(image,x, y, width, height, kard) {
    this.age = 0;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;

    this.cursor = {
      index: 1,
      size: this.x + 300
    };

    this.kard = kard;
  }

  view(context) {
    context.clearRect(0, 0, 600, 400);

    // kard
    context.drawImage(this.kard.back, 500, 100);
    // window
    context.drawImage(this.image, this.x, this.y, this.width, this.height);

    context.fillStyle = "rgb(255, 255, 255)";
    // hit box
    context.fillRect(this.x + 300, this.y + 20, 90, 60);

    // double box
    context.fillRect(this.x + 400, this.y + 20, 90, 60);

    // stand box
    context.fillRect(this.x + 500, this.y + 20, 90, 60);

    // bet box
    // context.fillRect(this.x + 20, this.y + 20, 180, 60);


    context.fillStyle = "rgb(0, 0, 0)";
    context.font = "30px normal"
    // hit text
    context.fillText("Hit", this.x + 320, this.y + 60);

    // double text
    context.fillText("double", this.x + 400, this.y + 60);

    // stand text
    context.fillText("stand", this.x + 505, this.y + 60);

    // bet text
    // context.fillText(`bet数 : `, this.x + 25, this.y + 60);

    this.view_cursor(context);
  }

  view_cursor(context) {
    context.strokeStyle = "red";
    context.strokeRect(this.cursor.size, this.y + 20, 90, 60);
  }

  // view_points(context, points) {
  //   context.font = "20px normal";
  //   context.fillText(`残り掛け金 : ${points}`, 10, 30);
  // }

  view_hit(context, number, x) {
    var y = 180;
    context.drawImage(game.player[number][0], x, y);
  }
  view_dealer_hit(context, number, x, type) {
    var y = 20;
    if (type == "back"){
      context.drawImage(this.kard.back, x, y);
    }else {
      context.drawImage(game.dealer[number][0], x, y);
    }
  }

  view_result(type, context) {
    context.fillStyle = "rgb(0, 0, 0)";
    context.font = "40px normal"
    if (type == "win") {
      context.fillText("You Win!", 180, 160);
    }else {
      context.fillText("You Loss", 180, 160);
    }
  }
}
