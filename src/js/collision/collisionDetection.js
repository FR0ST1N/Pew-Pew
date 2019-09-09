/** Collision detection class. */
class CollisionDetection {
  /**
   * @typedef {Object} colliderObject
   * @property {number} x
   * @property {number} y
   * @property {number} width
   * @property {number} height
   */

  /**
   * 2D box collider.
   * @param {colliderObject} colliderObject1
   * @param {colliderObject} colliderObject2
   * @return {boolean}
   */
  static detect(colliderObject1, colliderObject2) {
    let result = false;
    if (
      colliderObject1.x < colliderObject2.x + colliderObject2.width &&
      colliderObject1.x + colliderObject1.width > colliderObject2.x &&
      colliderObject1.y < colliderObject2.y + colliderObject2.height &&
      colliderObject1.y + colliderObject1.height > colliderObject2.y
    ) {
      result = true;
    }
    return result;
  }
}
