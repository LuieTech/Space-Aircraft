class Alien {
    constructor(ctx, y){
        this.ctx = ctx;
        this.x = this.ctx.canvas.width;
        this.y = y;
        
        this.w = 30*2;
        this.h = ALIEN_HEIGHT;

        this.vx = X_ALIEN_ACCELERATION;

        this.active = true;


        this.sprite = new Image();
        this.sprite.src = "/assets/img/aliens.png"
        this.sprite.horizontalFrame = 8;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrame = 1;
        this.sprite.verticalFrameIndex = 0

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrame);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrame);        
        }
        this.animationTick = 0
    }
    draw() {
        if (this.sprite.isReady) {
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
            );
            this.animate();
        }   
    }

    move() {
        this.x += this.vx;
    }

    animate() {
        this.animationTick++;
    
        if (this.animationTick > ALIEN_TICK) {
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;
        } else if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrame - 1) {
            this.sprite.horizontalFrameIndex = 0;
        }    
    }
    
    isVisible() {
        return this.x + this.w > 0
    }
}