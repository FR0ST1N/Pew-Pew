/**
 * @file Contains all methods for sound effects.
 * @author Frostin <iamfrostin@gmail.com>
 */

/** Play game audio effects. */
class AudioEffects {
  /** Play player fire sound effect */
  static playPlayerPewSound() {
    this._playSound(
        [1, , 0.2795, , 0.1338, 0.6607, 0.294, -0.2058, , , , , ,
          0.5423, -0.5507, , , , 1, , , , , 0.5]
    );
  }

  /** Play enemy fire sound effect */
  static playEnemyPewSound() {
    this._playSound(
        [2, , 0.2, , 0.1753, 0.64, , -0.5261, , , , , , 0.5522, -0.564, , , ,
          1, , , , , 0.5]
    );
  }

  /** Play barrier absorb sound effect */
  static playBarrierSound() {
    this._playSound(
        [0, , 0.086, , 0.2876, 0.2768, , 0.4249, , , , , , 0.0168, , 0.5209, , ,
          1, , , , , 0.5]
    );
  }

  /** Play player damage sound effect */
  static playPlayerDamageSound() {
    this._playSound(
        [3, , 0.1606, 0.5988, 0.2957, 0.1157, , -0.3921, , , , , , , , , 0.3225,
          -0.2522, 1, , , , , 0.5]
    );
  }

  /** Play enemy damage sound effect */
  static playEnemyDamageSound() {
    this._playSound(
        [0, , 0.0639, , 0.2425, 0.7582, , -0.6217, , , , , , 0.4039, , , , ,
          1, , , , , 0.5]
    );
  }

  /** Play ui action sound effect */
  static playUiSound() {
    this._playSound(
        [1, , 0.1401, , 0.1884, 0.5359, , , , , , , , , , , , ,
          1, , , 0.1, , 0.5]
    );
  }

  /**
   * Play sound main method
   * @param {number[]} values Values for jsfxr.
   */
  static _playSound(values) {
    const SOUND_URL = jsfxr(values);
    const AUDIO = new Audio();
    AUDIO.src = SOUND_URL;
    AUDIO.play();
  }
}
