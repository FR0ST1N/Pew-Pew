
/** since enums are not available at disposable, enum alternative
 *  var/const pattern = {}; Object.freeze(pattern); could also work.
 * @readonly
 * @enum {string}
 */
class BulletPattern {
  /**
   * bullet pattern default.
   * @return {string}
   */
  static get DEFAULT() {
    return BulletPattern.STRAIGHT;
  }

  /**
   * bullet pattern stright
   * @return {string}
   */
  static get STRAIGHT() {
    return 'straight';
  }

  /**
   * bullet pattern scatter
   * @return {string}
   */
  static get SCATTER() {
    return 'scatter';
  }
}