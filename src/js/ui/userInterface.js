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

/** Handles the UI stuff. */
class UserInterface {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} version
   */
  constructor(ctx, version) {
    this.ctx = ctx;
    this.version = version;
    this.healthSpriteSheet = new SpriteSheet(
        'images/ui_heart.png',
        5
    );
    this.countSpriteSheet = new SpriteSheet(
        'images/ui_bullet_holder.png',
        7
    );
    this.logoSpriteSheet = new SpriteSheet(
        'images/logo.png',
        15
    );
    this.names = ['a', 'b', 'c', 'd', 'e', 'f'];
    this.states = {
      'START': 0,
      'GAME': 1,
      'GAMEOVER': 2,
    };
    this.currentState = this.states.START;
  }

  /** Initialize UI. */
  init() {
    this.healthSpriteSheet.addSpriteBulk(
        this.names.slice(0, 4),
        1,
        4
    );
    this.countSpriteSheet.addSpriteBulk(
        this.names,
        1,
        6
    );
    this.logoSpriteSheet.addSprite({
      name: 'logo',
      x: 0,
      y: 0,
    });
    this._uiInputListener();
  }

  /**
   * Draw UI based on the state.
   * @param {number} currHealth Player's current health/lives.
   * @param {number} count Bullet count.
   * @param {number} score Current score.
   */
  draw(currHealth, count, score) {
    if (currHealth === null) {
      currHealth = 0;
      count = 0;
      score = 0;
    }
    this.ctx.save();
    switch (this.currentState) {
      case this.states.START:
        this._drawLogo();
        this.ctx.fillStyle = '#daf3ec';
        this._drawControls(565, 485);
        Font.draw(this.version, 2, this.ctx, 10, 10);
        Font.draw('Press space to start', 4.11, this.ctx, 250, 430);
        break;
      case this.states.GAME:
        this._drawHealth(currHealth);
        this._drawBulletCount(count);
        this._drawScore(score.toString(), 5);
        break;
      case this.states.GAMEOVER:
        this.ctx.fillStyle = '#daf3ec';
        Font.draw('Your score is', 5, this.ctx, 50, 300);
        Font.draw('Press space to play again', 5, this.ctx, 50, 350);
        this.ctx.fillStyle = '#00bff3';
        Font.draw(score.toString(), 5, this.ctx, 300, 300);
        break;
    }
    this.ctx.restore();
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
    if (event.code === 'Space') {
      if (
        this.currentState === this.states.START ||
        this.currentState === this.states.GAMEOVER
      ) {
        AudioEffects.playUiSound();
        this.currentState = this.states.GAME;
      }
    }
  }

  /** Draw Logo on start screen. */
  _drawLogo() {
    const SCALE = 20;
    const SIZE = this.logoSpriteSheet.spriteSize * SCALE;
    PlayerUtil.imgDrawCall(
        this.ctx,
        this.logoSpriteSheet,
        'logo',
        this.logoSpriteSheet.spriteSize,
        (800 - SIZE) / 2,
        (600 - SIZE) / 2,
        SCALE
    );
  }

  /**
   * Draw player health.
   * @param {number} value Player's current health.
   */
  _drawHealth(value) {
    PlayerUtil.imgDrawCall(
        this.ctx,
        this.healthSpriteSheet,
        this.names[value],
        this.healthSpriteSheet.spriteSize,
        10,
        550,
        7
    );
  }

  /**
   * Draw player's bullet count.
   * @param {number} value Bullet count.
   */
  _drawBulletCount(value) {
    PlayerUtil.imgDrawCall(
        this.ctx,
        this.countSpriteSheet,
        this.names[value],
        this.countSpriteSheet.spriteSize,
        50,
        540,
        7
    );
  }

  /**
   * Draw current score.
   * @param {number} value Score.
   * @param {number} size Font size.
   */
  _drawScore(value, size) {
    this.ctx.fillStyle = '#00bff3';
    const CORRECTION = (value.length - 1) * 20;
    Font.draw(value, size, this.ctx, 775 - CORRECTION, 10);
  }

  /**
   * Draw controls in UI
   * @param {number} x
   * @param {number} y
   */
  _drawControls(x, y) {
    this.ctx.strokeStyle = '#daf3ec';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, 210, 90);
    Font.draw('Controls', 2.5, this.ctx, x + 10, y + 10);
    Font.draw('Arrow Keys - Movement', 2.2, this.ctx, x + 10, y + 30);
    Font.draw('z - Barrier', 2.2, this.ctx, x + 10, y + 50);
    Font.draw('x - pew', 2.2, this.ctx, x + 10, y + 70);
  }
}
