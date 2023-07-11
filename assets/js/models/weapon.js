class Weapon {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        
        this.x = x;
        this.y = y;
        this.audio = new Audio("/assets/audio/laser.wav");
        this.audio.volume = 0.5;

        this.bullets = [];
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.x, this.y))
        
        this.audio.play()
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