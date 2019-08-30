/** since enums are not available at disposable, enum alternative
 *  var/const pattern = {}; Object.freeze(pattern); could also work.
 * 
 * @readonly
 * @enum {string}
 */
class BulletPattern{
    static get DEFAULT(){
        return Pattern.SCATTER;
    }

    static get STRAIGHT(){
        return "straight";
    }

    static get SCATTER(){
        return "scatter";
    }
}

/**
 *  Each bullet has its own behaviour, 
 *  @todo after bulletCreation, bullet should move towards its targetPosition,
 * 
*/
class Bullet{
    /**
     * @param {position} startposition
     * @param {Enumerator BulletPattern - string} pattern 
     * @param {number} speed 
     * @param {number} damage 
     */
    constructor(startposition = null, pattern = BulletPattern.DEFAULT,  speed = 1, damage = 1){
        this.position = startposition;
        this.pattern = pattern;
        this.speed = speed;
        this.damage = damage;
    }
    
    /**
     * @returns {Bullet}
     */
    static get DEFAULT(){
        return new Bullet();
    }

    /**
     * the postion that the bullet should travel towards,
     * bullet explodes at end?(inrelation with bulletPattern) or just goes offscreen,
     * @param {Position} position 
     * @returns {Position}
     */
    setBulletTarget(position){
        this.targetPosition = position;
        return this.targetPosition;
    }

    /**
     * if you are insane, and teleport a bullet for some reason.
     * @param {Position} position,
     * @returns {Position}
     */
    setBulletPostition(position){
        this.position =  position;
        return this.position;
    }
    
    /**
     * @todo calculations based on position and move towards targetposition. triggers animation
     * @returns {boolean}
     */
    fire(){
        return true;
    }
}


