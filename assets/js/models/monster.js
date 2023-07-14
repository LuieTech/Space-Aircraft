class Monster {
    constructor(ctx){
        this.ctx = ctx;
        this.x = this.ctx.canvas.width;
        
        this.y = (this.ctx.canvas.height / 2) - MONSTER_HEIGHT/2;
        
        this.w = MONSTER_WIDTH;
        this.h = MONSTER_HEIGHT;

        this.vx = X_MONSTER_ACCELERATION;
        this.vy = Y_MONSTER_ACCELERATION;
        this.direction = 1;

        this.active = true;
        this.monsterWeapon = new MonsterWeapon(this.ctx, this.x + MONSTER_WIDTH, this.y + MONSTER_HEIGHT/2 )
        this.sprite = new Image();
        this.sprite.src = "./assets/img/green.png"
        this.sprite.horizontalFrame = 4;
        this.sprite.horizontalFrameIndex = 0
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
        this.monsterWeapon.draw()   
    }

    move() {

        const xPoint = this.x > (this.ctx.canvas.width / 3) * 2;
        const maxY = this.ctx.canvas.height - MONSTER_HEIGHT;
        const minY = 0;
    
        if (xPoint) {
            this.x -= X_MONSTER_ACCELERATION;
        } else {
            this.y += Y_MONSTER_ACCELERATION * this.direction;
            
            if (this.y <= minY) {
                this.direction = 1 
            } else if (this.y >= maxY) {
                this.direction = -1
            }
        }

        this.monsterWeapon.x = this.x + MONSTER_WIDTH/2;
        this.monsterWeapon.y = this.y + MONSTER_HEIGHT/2;
        this.monsterWeapon.move();
        
    }

    shoot(){
        this.monsterWeapon.shoot()

    }

    animate() {
        this.animationTick++;
    
        if (this.animationTick > MONSTER_TICK) {
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