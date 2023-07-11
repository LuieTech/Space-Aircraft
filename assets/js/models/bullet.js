class Bullet {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.ax = BULLET_ACCELERATION;
        this.r = 2
    }

    draw(){

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = "white";
        this.ctx.fill()
        this.ctx.closePath();

    }

    move(){
        
        this.vx += this.ax;
        // this.vy = this.ay;
        this.x += this.vx;
        // this.y += this.vy;

    }

    isVisible() {
        return this.x < this.ctx.canvas.width;
    }
}