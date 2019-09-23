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
    this.globalObject = {
      player: null,
      ui: null,
      score: 0,
    };
    this.requestAnimationFrameId = null;
  }

  /** Game initialization. */
  init() {
    /* Make pixel art crispy */
    this.ctx.imageSmoothingEnabled = false;
    /* Make movements smooth */
    this.ctx.globalCompositeOperation = 'source-over';
    /* Create and init player */
    this.globalObject.player = this._createPlayer();
    this.globalObject.player.init();
    /* Create and init UI */
    this.globalObject.ui = new UserInterface(this.ctx);
    this.globalObject.ui.init();
    /* Init level */
    this.level = new Level(this);
    this.globalObject.player.setLevel(this.level);
    /* reset level to one if already, on another level
     this.level.resetLevelToOne(); */
    /* trigger that level */
    this.level.levelTrigger();
    /* Render game */
    this._render();
  }

  /** Main render method. */
  _render() {
    /* Clear canvas */
    this.ctx.clearRect(0, 0, this.width, this.height);
    /* Assign player obj to a temp const and increment player frame. */
    const PLAYER = this.globalObject.player;
    PLAYER.frameCounter++;
    /* Paint BG */
    this.ctx.fillStyle = '#260016';
    this.ctx.fillRect(0, 0, this.width, this.height);
    /* Player life check */
    if (PLAYER.lives <= 0) {
      window.cancelAnimationFrame(this._render.bind(this));
      alert('gameover');
    }
    /* Change player position */
    PLAYER.playerMovement();
    /* Draw player */
    PLAYER._drawFrame();
    /* Draw enemy and bullets Inside "EnemySpawner" class */
    /* What is happening here?! monkaS */
    let state = null;
    this.level.currentLevelEnemies.forEach((enemy) => {
      if (enemy.position != null) {
        state = true;
      }
    });
    if (state == null) {
      this.level.triggerNextLevel();
    }
    this.level.draw();
    /* Draw UI */
    this.globalObject.ui.draw(
        PLAYER.lives,
        PLAYER.bulletCount,
        this.globalObject.score
    );
    /* Refresh frame */
    this.requestAnimationFrameId =
        window.requestAnimationFrame(this._render.bind(this));
  }

  /**
   * Create new player.
   * @return {Player} A Player instance.
   */
  _createPlayer() {
    const P_SS = {
      image: 'images/player.png',
      spriteSize: 32,
      rows: 4,
      columns: 2,
    };
    const SPRITE_NAMES = [
      'idle1',
      'idle2',
      'pop1',
      'pop2',
      'push1',
      'push2',
      'shield',
      'blank',
    ];
    const CANVAS_SIZE = {
      width: this.width,
      height: this.height,
    };
    const KEYS = {
      left: 'ArrowLeft',
      up: 'ArrowUp',
      right: 'ArrowRight',
      down: 'ArrowDown',
      pew: 'KeyX',
      absorb: 'KeyZ',
    };
    const PLAYER = new Player(P_SS, SPRITE_NAMES, this.ctx, CANVAS_SIZE, KEYS);
    return PLAYER;
  }
}
