class MonsterWeapon {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        
        this.x = x;
        this.y = y;

        this.bullets = [];

        this.active = true;
        
    }

    shoot() {
        const newBullet = new MonsterBullet(this.ctx, this.x, this.y);
        this.bullets.push(newBullet);
    }

    draw(){
        
        this.bullets.forEach((Bullet) => {
           Bullet.draw()
        })

    }

    move(){
        this.bullets.forEach((Bullet) => {
            Bullet.move()
        })
    }

    clearBullets(){
        this.bullets = this.bullets.filter(bullet => bullet.isVisible())
    }
}