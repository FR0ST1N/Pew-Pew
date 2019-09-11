/**
 * @file Contains all methods for sound effects.
 * @author Frostin<iamfrostin@gmail.com>
 */

/** Play game audio effects. */
class AudioEffects {
  /** Play fire sound effect */
  static playPewSound() {
    this._playSound(
        [0, , 0.16, 0.18, 0.18, 0.47, 0.0084, -0.26, , , , , , 0.74, -1, ,
          -0.76, , 1, , , , , 0.15]
    );
  }

  /** Play barrier absorb sound effect */
  static playBarrierSound() {
    this._playSound(
        [0, , 0.01, , 0.4384, 0.2, , 0.12, 0.28, 1, 0.65, , , 0.0419, , , , ,
          1, , , , 0.3]
    );
  }

  /** Play player damage sound effect */
  static playPlayerDamageSound() {
    this._playSound(
        [3, , 0.1606, 0.5988, 0.2957, 0.1157, , -0.3921, , , , , , , , , 0.3225,
          -0.2522, 1, , , , , 0.25]
    );
  }

  /** Play enemy damage sound effect */
  static playEnemyDamageSound() {
    this._playSound(
        [0, , 0.0639, , 0.2425, 0.7582, , -0.6217, , , , , , 0.4039, , , , ,
          1, , , , , 0.25]
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
