
class Window_actions {
  constructor() {
    this.key = {
      enter: 0,
      space: false,
      up: false,
      down: false,
      right: false,
      left: false,
    }
  }

  key_event($window) {
    $window.keydown((event) => {
      switch (event.keyCode) {
        case 13: // enter
          this.key.enter += 1;
          break;
        case 37: // left
          this.key.left = true;
          break;
        case 39: // right
          this.key.right = true;
          break;
      }
    })

    $window.keyup((event) => {
      switch (event.keyCode) {
        case 13: // enter
          this.key.enter = 0;
          break;
        case 37: // left
          this.key.left = false;
          break;
        case 39: // right
          this.key.right = false;
          break;

      }
    })
  }

  move(window_main) {
    var main = window_main;
    if (main.age % 3 != 0){
      return
    }
    if (this.key.left && main.cursor.index != 1) {
      main.cursor.index--;
      main.cursor.size -= 100;
    }else if (this.key.right && main.cursor.index != 3) {
      main.cursor.index++;
      main.cursor.size += 100;
    }
  }

  isHit(main) {
    if (main.cursor.index == 1){
      return true;
    }
    return false;
  }

  isDouble(main) {
    if (main.cursor.index == 2){
      return true;
    }
    return false;
  }

  isStand(main) {
    if (main.cursor.index == 3){
      return true;
    }
    return false;
  }
}
