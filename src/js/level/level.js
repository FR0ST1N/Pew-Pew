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
      /* Stage 0 */
      [{x: 700, y: 75}, {x: 600, y: 175}, {x: 550, y: 275}, {x: 600, y: 375},
        {x: 700, y: 475}],
      /* Stage 1 */
      [{x: 300, y: 50}, {x: 350, y: canvasSize.height - 50}, {x: 400, y: 50},
        {x: 450, y: canvasSize.height - 50}, {x: 500, y: 50},
        {x: 550, y: canvasSize.height - 50}],
    ];
    this.movementSpeeds = [1, 10];
    this.enemies = [];
    this.enemyBullets = [];
    this.bulletManager = new BulletManager();
    this.stage = this.stages.length - 1;
    this.level = 0;
    this.maxFrames = 60;
    this.frame = 1;
  }

  /**
   * Draw Level
   * @param {Enemy[]} enemies
   * @param {Bullet[]} enemyBullets
   */
  draw(enemies, enemyBullets) {
    this.enemies = enemies;
    this.enemyBullets = enemyBullets;
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].interval === this.frame) {
        this.enemyBullets[enemyBullets.length] = (new Bullet(
            {
              x: this.enemies[i].position.x - 15,
              y: this.enemies[i].position.y + 10,
            },
            this.images[1],
            this.enemies[i].bulletSpeed,
            this.ctx,
            this.canvasSize)
        );
        this.enemies[i].pew();
      }
      this.enemies[i].draw();
    }
    /* Draw bullets */
    this.bulletManager.draw(enemyBullets);
    this.frame = this.frame <= this.maxFrames ? ++this.frame : 1;
    /* Load next stage if all enemies are dead */
    if (this.enemies.length === 0) {
      const N = ++this.stage % this.stages.length;
      this.stage = N;
      this.level = N === 0 ? ++this.level : this.level;
      this.loadStage(this.stage);
    }
  }

  /** Destroy level objects */
  destroy() {
    for (const ENEMY of this.enemies) {
      ENEMY.position = null;
    }
    for (const BULLET of this.enemyBullets) {
      BULLET.position = null;
    }
    this.enemies = null;
    this.enemyBullets = null;
  }

  /**
   * Load Stage.
   * @param {number} n Index for stage to load from.
   */
  loadStage(n) {
    const STAGE = this.stages[n];
    const MOVEMENT_SPEED = this.movementSpeeds[n];
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
          this.level,
          MOVEMENT_SPEED,
          10,
          60,
          this.stage);
    }
  }
}
