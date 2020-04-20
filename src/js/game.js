/*
 * Pew-Pew
 * Copyright (C) 2019 Frostin
 *
 * This file is part of Pew-Pew.
 *
 * Pew-Pew is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pew-Pew is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Pew-Pew.  If not, see <http://www.gnu.org/licenses/>.
 */

/** @file Game class where everything comes together. */
class Game {
  /**
   * @param {HTMLCanvasElement} canvas Game canvas element.
   * @param {HTMLCanvasElement} uiCanvas UI canvas element.
   * @param {number} width Canvas width.
   * @param {number} height Canvas height.
   * @param {HTMLImageElement[]} images Game images.
   */
  constructor(canvas, uiCanvas, width, height, images) {
    canvas.width = width;
    canvas.height = height;
    uiCanvas.width = width;
    uiCanvas.height = height;
    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext('2d');
    this.uiCtx = uiCanvas.getContext('2d');
    this.canvasSize = {
      width: this.width,
      height: this.height,
    };
    this.images = images;
    this.globalObject = {
      player: null,
      ui: null,
      score: null,
      level: null,
    };
    this.previous = {
      health: null,
      bullets: null,
      score: null,
    };
    this.requestAnimationFrameId = null;
    this.version = 'v1.0.1';
    this.collisionManager = null;
  }

  /** Game initialization. */
  init() {
    /* Make pixel art crispy */
    this.ctx.imageSmoothingEnabled = false;
    this.uiCtx.imageSmoothingEnabled = false;
    /* Make movements smooth */
    this.ctx.globalCompositeOperation = 'source-over';
    /* Create and init player */
    this.globalObject.player = this._createPlayer();
    this.globalObject.player.init();
    /* Create and init UI */
    const UI_IMAGES = this.images.slice(2, 5);
    this.globalObject.ui = new UserInterface(
        this.uiCtx,
        this.canvasSize,
        this.version,
        UI_IMAGES);
    this.globalObject.ui.init();
    /* Create score instance and set it */
    this.globalObject.score = new Score();
    /* Draw start screen */
    this.globalObject.ui.draw();
    /* UI input listener */
    this._uiInputListener();
    /* Collision manager */
    this.collisionManager = this._createCollisionManager();
    /* Init Level */
    this.globalObject.level = this._createLevel();
  }

  /** Main render method. */
  _render() {
    /* Clear canvas */
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (!this._isDead()) {
      /* Check condition and redraw UI */
      this._redrawUI();
      /* Draw Game */
      this._drawGame();
      /* Refresh frame */
      this.requestAnimationFrameId =
          window.requestAnimationFrame(this._render.bind(this));
    }
  }

  /**
   * Stop render and set ui to gameover
   * @return {boolean}
   */
  _isDead() {
    if (this.globalObject.player.lives <= 0) {
      window.cancelAnimationFrame(this.requestAnimationFrameId);
      this.requestAnimationFrameId = null;
      this.globalObject.ui.currentState = this.globalObject.ui.states.GAMEOVER;
      this.globalObject.ui.draw(0, 0, this.globalObject.score.getScore());
      return true;
    } else {
      return false;
    }
  }

  /** Check condition and redraw UI. Also stores values of previous frame. */
  _redrawUI() {
    const HEALTH = this.globalObject.player.lives;
    const BULLETS = this.globalObject.player.bulletCount;
    const SCORE = this.globalObject.score.getScore();
    if (this.previous.health != HEALTH || this.previous.bullets != BULLETS ||
        this.previous.score != SCORE) {
      this.globalObject.ui.draw(HEALTH, BULLETS, SCORE);
    }
    this.previous.health = HEALTH;
    this.previous.bullets = BULLETS;
    this.previous.score = SCORE;
  }

  /** Check collision and draw gameplay. */
  _drawGame() {
    /* Check collision */
    this.collisionManager.checkCollision(
        this.globalObject.player.bulletManager.bullets,
        this.globalObject.level.bulletManager.bullets,
        this.globalObject.player.position,
        this.globalObject.player.pressed.absorb,
        this.globalObject.level.enemies,
        this.globalObject.player.lives,
        this.globalObject.player.bulletCount,
        this.globalObject.score,
        this.globalObject.level.level);
    /* Reassign the score object */
    this.globalObject.score = this.collisionManager.score;
    /* Change player position */
    this.globalObject.player.playerMovement();
    /* Draw player */
    this.globalObject.player._drawFrame(
        this.collisionManager.playerBullets,
        this.collisionManager.playerHealth,
        this.collisionManager.playerBulletCount);
    /** Draw level */
    this.globalObject.level.draw(
        this.collisionManager.enemies,
        this.collisionManager.enemyBullets);
  }

  /**
   * Create a new collision manager.
   * @return {CollisionManager}
   */
  _createCollisionManager() {
    return new CollisionManager(
        this.ctx,
        {
          scale: this.globalObject.player.scale.player,
          width: this.globalObject.player.scale.player * 32,
          height: this.globalObject.player.scale.player * 32,
        },
        {
          scale: this.globalObject.player.scale.barrier,
          width: this.globalObject.player.scale.barrier * 32,
          height: this.globalObject.player.scale.barrier * 32,
        },
        {
          width: 48,
          height: 48,
        }
    );
  }

  /**
   * Create a new Level instance.
   * @return {Level}
   */
  _createLevel() {
    return new Level(
        this.ctx,
        this.canvasSize,
        this.images.slice(5, 7));
  }

  /**
   * Create new player.
   * @return {Player} A Player instance.
   */
  _createPlayer() {
    const P_SS = {
      image: null,
      spriteSize: 32,
      rows: 4,
      columns: 2,
    };
    const SPRITE_NAMES = [
      'idle1',
      'idle2',
      'fire1',
      'fire2',
      'absorb1',
      'absorb2',
      'shield',
      'blank',
    ];
    const KEYS = {
      left: 'ArrowLeft',
      up: 'ArrowUp',
      right: 'ArrowRight',
      down: 'ArrowDown',
      pew: 'KeyX',
      absorb: 'KeyZ',
    };
    const PLAYER_IMAGES = this.images.slice(0, 2);
    const PLAYER = new Player(P_SS, SPRITE_NAMES, this.ctx, this.canvasSize,
        KEYS, PLAYER_IMAGES);
    return PLAYER;
  }

  /** Reset game. */
  _resetGame() {
    /* Reset score */
    this.globalObject.score.resetScore();
    /* Create new player */
    this.globalObject.player.destroy();
    this.globalObject.player = this._createPlayer();
    this.globalObject.player.init();
    /* Reset previous values */
    this.previous = {
      health: null,
      bullets: null,
      score: null,
    };
    /* Reset level */
    this.globalObject.level.destroy();
    this.globalObject.level = this._createLevel();
    /* Reset collision manager */
    this.collisionManager = this._createCollisionManager();
  }

  /** Listener for start and restart game. */
  _uiInputListener() {
    document.addEventListener('keydown', this._uiInput.bind(this), false);
  }

  /**
   * UI Input Listener
   * @param {KeyboardEvent} event
   */
  _uiInput(event) {
    if (event.repeat) {
      return;
    }
    const UI = this.globalObject.ui;
    if (event.code === 'Space') {
      if (
        UI.currentState === UI.states.START ||
        UI.currentState === UI.states.GAMEOVER
      ) {
        AudioEffects.playUiSound();
        if (UI.currentState == UI.states.GAMEOVER) {
          this._resetGame();
        }
        UI.currentState = UI.states.GAME;
        this._render();
      }
    }
  }
}
