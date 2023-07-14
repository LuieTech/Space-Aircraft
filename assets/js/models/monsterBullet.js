class MonsterBullet{
    constructor(ctx, x, y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.vx = MONSTER_BULLET_ACCELERATION
    

        this.w = 35;
        this.h = 25;

        this.active = true;

        this.sprite = new Image();
        this.sprite.src = "./assets/img/green.png";
        this.sprite.horizontalFrame = 4;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrame = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrame);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrame);        
        }

        this.animationTick = 0;
    }

    draw(){
        this.ctx.drawImage(
            this.sprite,
            this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
            this.sprite.verticalFrameIndex * this.sprite.frameHeight,
            this.sprite.frameWidth,
            this.sprite.frameHeight,
            this.x,
            this.y,
            this.w,
            this.h
        )
        this.animate();
    }

    animate() {
        this.animationTick++;
    
        if (this.animationTick > GREENS_TICK) {
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;
        } else if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrame - 1) {
            this.sprite.horizontalFrameIndex = 0;
        }    
    }

    move() {

        this.x += this.vx;
        
    }

    isVisible() {
        return this.x + this.w > 0;
    }
}
