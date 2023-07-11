class Info {
    constructor(ctx){
        this.ctx = ctx;
        this.x = this.ctx.canvas.width;
        this.score = 0
        this.lives = 3
       
    }

    draw(){
        this.ctx.font = "15px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.fillText("Score: " + this.score, this.x - 100, 35)
        this.ctx.fillText("Lives: " + this.lives, this.x - 100, 55)

    }

}