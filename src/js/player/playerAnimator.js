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

/** Absorb animation logic for player. */
class PlayerAnimator extends Animator {
  /** Inherited values from Animator class */
  constructor() {
    super();
  }

  /**
   * Absorb animation logic
   * States - 4 and 5
   */
  absorbAnimation() {
    if (this.animState === 0) {
      this.animState = 4;
      this._resetAndIncrement();
    } else if (this.animState === 1) {
      this.animState = 5;
      this._resetAndIncrement();
    } else if (this.frameCounter <= 15) {
      this.animState = 4;
    } else if (this.frameCounter >= 16 && this.frameCounter <= 30) {
      this.animState = 5;
    }
    if (this.frameCounter === 30) {
      this.resetFrameCounter();
    }
  }

  /** Reset frame counter and set it to 1. */
  _resetAndIncrement() {
    this.resetFrameCounter();
    this.incrementFrame = 1;
  }
}
