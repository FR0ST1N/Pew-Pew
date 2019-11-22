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

/**
 * @file 2dimensional postion inrelation to canvas.
 * @author bluepie <gopinath2nr@gmail.com>
 */
class Position {
  /**
   * @param {number} xcordinates
   * @param {number} ycordinates
   */
  constructor(xcordinates = 0, ycordinates = 0) {
    this.x = xcordinates;
    this.y = ycordinates;
  }
}
