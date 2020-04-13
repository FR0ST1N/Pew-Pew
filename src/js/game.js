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
   * @param {number} width Canvas width.
   * @param {number} height Canvas height.
   * @param {HTMLImageElement[]} images Game images.
   */
  constructor(canvas, width, height, images) {
    canvas.width = width;
    canvas.height = height;
    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext('2d');
    this.images = images;
    this.globalObject = {
      player: null,
      ui: null,
      score: null,
    };
    this.requestAnimationFrameId = null;
    this.version = 'v1.0.0-alpha.2';
    this.resetScore = false;
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
    const UI_IMAGES = this.images.slice(2, 5);
    this.globalObject.ui = new UserInterface(this.ctx, this.version, UI_IMAGES);
    this.globalObject.ui.init();
    /** Create score instance and set it */
    this.globalObject.score = new Score();
    /* Render game */
    this._render();
  }

  /** Main render method. */
  _render() {
    /* Clear canvas */
    this.ctx.clearRect(0, 0, this.width, this.height);
    /* Paint BG */
    this.ctx.fillStyle = '#260016';
    this.ctx.fillRect(0, 0, this.width, this.height);
    /* Assign UI instance to a const */
    const UI = this.globalObject.ui;
    /* GameOver screen when player dies and reset game */
    if (this.globalObject.player.lives <= 0 &&
        UI.currentState === UI.states.GAME) {
      UI.currentState = UI.states.GAMEOVER;
      this._resetGame();
    }
    /* Draw actual game only if the current UI state says so */
    if (UI.currentState === UI.states.GAME) {
      /* Reset score when gameover -> game state */
      if (this.resetScore) {
        this.globalObject.score.resetScore();
        this.resetScore = false;
      }
      this._drawGame(this.globalObject.player);
    }
    /* Draw UI */
    UI.draw(
        this.globalObject.player.lives,
        this.globalObject.player.bulletCount,
        this.globalObject.score.getScore()
    );
    /* Refresh frame */
    this.requestAnimationFrameId =
        window.requestAnimationFrame(this._render.bind(this));
  }

  /**
   * Draw Gameplay
   * @param {Player} player A Player instance.
   */
  _drawGame(player) {
    /* increment player frame */
    player.frameCounter++;
    /* Change player position */
    player.playerMovement();
    /* Draw player */
    player._drawFrame();
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
    const PLAYER_IMAGES = this.images.slice(0, 2);
    const PLAYER = new Player(P_SS, SPRITE_NAMES, this.ctx, CANVAS_SIZE, KEYS,
        PLAYER_IMAGES);
    return PLAYER;
  }

  /** Reset game. */
  _resetGame() {
    this.resetScore = true;
    /* Destroy old player */
    this.globalObject.player.destroy();
    /* Crerate new player */
    this.globalObject.player = this._createPlayer();
    this.globalObject.player.init();
  }
}
