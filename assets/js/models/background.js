class Background {
    constructor(ctx){
        this.ctx = ctx;

        this.x = 0;
        this.y = 0;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        this.vx = BACKGROUND_SPEED;
        
        this.sprite = new Image();
        this.sprite.src = "./assets/img/space.png"
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        };
    }

    move(){
        this.x -= BACKGROUND_SPEED;

        if(this.x < -this.w){
            this.x = 0;
        }
    }

    draw(){
        if(this.sprite.isReady){
            this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
            this.ctx.drawImage(this.sprite, this.x + this.w, this.y, this.w, this.h);
        }
    }
}