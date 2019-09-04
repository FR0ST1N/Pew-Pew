/** Game class where everything comes together. */
class Game {
  /**
   * @param {HTMLCanvasElement} canvas Game canvas element.
   * @param {number} width Canvas width.
   * @param {number} height Canvas height.
   */
  constructor(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext('2d');
  }

  /** Game initialization. */
  init() {
    /* Make pixel art crispy */
    this.ctx.imageSmoothingEnabled = false;
    /* Make movements smooth */
    this.ctx.globalCompositeOperation = 'source-over';
    /* Invoke start method to start the game */
    this.start();
  }

  /** Start Game. */
  start() {
    const KEYS = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      pew: 88,
      absorb: 90,
    };
    const P_SS = {
      image: 'images/player.png',
      spriteSize: 32,
      rows: 3,
      columns: 2,
    };
    const CANVAS_SIZE = {
      width: this.width,
      height: this.height,
    };
    const PLAYER = new Player(P_SS, this.ctx, CANVAS_SIZE, KEYS);
    PLAYER.init();
  }
}
