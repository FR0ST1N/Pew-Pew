
class Enemy {
    constructor(position = null, bullet = Bullet.DEFAULT, health = 1 ){
        this.position = position;
        this.bullet = bullet;
        this.health = health;
    }
}