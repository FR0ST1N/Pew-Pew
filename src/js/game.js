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
    this.ctx = canvas.getContext('2d');
  }

  /**
   * Game initialization.
   */
  init() {
    this.ctx.font = 'bold 48px serif';
    new EnemySpawner(this.ctx);
  }
}
