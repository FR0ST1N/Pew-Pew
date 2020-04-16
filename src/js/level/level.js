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

/** @file Manages enemies and gameplay. */
class Level {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {canvasSize} canvasSize
   * @param {HTMLImageElement[]} images
   */
  constructor(ctx, canvasSize, images) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.images = images;
    this.stages = [
      [{x: 200, y: 200}, {x: 300, y: 300}, {x: 400, y: 400}],
    ];
    this.enemies = [];
    this.bulletManager = new BulletManager();
  }

  /** Draw Level */
  draw() {
    for (const ENEMY of this.enemies) {
      ENEMY.draw();
    }
  }

  /**
   * Load Stage.
   * @param {number} n Index for stage to load from.
   */
  loadStage(n) {
    const STAGE = this.stages[n];
    for (let i = 0; i < STAGE.length; i++) {
      this.enemies[i] = new Enemy(
          this.ctx,
          this.canvasSize,
          {
            image: this.images[0],
            spriteSize: 32,
            rows: 2,
            columns: 2,
          },
          {
            x: STAGE[i].x,
            y: STAGE[i].y,
          },
          1,
          3,
          3,
          3);
    }
  }
}
