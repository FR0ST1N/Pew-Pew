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

/** Common animator class for both player and enemy. */
class Animator {
  /** No params for constructor */
  constructor() {
    this.frameCounter = 0;
    /*
     * Each animations has two states.
     * Idle - 0 and 1
     * Fire - 2 and 3
     */
    this.animState = 0;
  }

  /** Idle animation logic */
  idleAnimation() {
    if (this.frameCounter <= 15) {
      this.animState = 0;
    } else if (this.frameCounter >= 16 && this.frameCounter <= 30) {
      this.animState = 1;
    }
    if (this.frameCounter === 30) {
      this.frameCounter = 0;
    }
  }

  /** Fire animation logic */
  fireAnimation() {
    const ANIM_TIME = 7;
    if (this.frameCounter <= ANIM_TIME) {
      if (this.animState === 0) {
        this.animState = 2;
      } else if (this.animState === 1) {
        this.animState = 3;
      }
    } else if (this.frameCounter > ANIM_TIME) {
      this.returnToIdle(2, 3);
      /* NOTE: set pressed flase from player */
      // this.pressed.pew = false;
    }
  }

  /**
   * Returns back to idle animation.
   * @param {number} a State 1.
   * @param {number} b State 2.
   */
  returnToIdle(a, b) {
    if (this.animState === a) {
      this.animState = 1;
      /* For smooth transition to idle state */
      this.frameCounter = 15;
    } else if (this.animState === b) {
      this.animState = 0;
      this.frameCounter = 0;
    }
  }

  /** Reset frame counter to 0. */
  resetFrameCounter() {
    this.frameCounter = 0;
  }

  /** Returns the current animation state. */
  get state() {
    return this.animState;
  }

  /**
   * Used to increment the frame counter.
   * @param {number} v Frame increment value.
   */
  set incrementFrame(v) {
    this.frameCounter = this.frameCounter + v;
  }
}
