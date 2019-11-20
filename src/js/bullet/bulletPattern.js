
/**
 * @file since enums are not available at disposable, enum alternative
 * @author bluepie <gopinath2nr@gmail.com>
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
  static get FOLLOW() {
    return 'follow';
  }
}
