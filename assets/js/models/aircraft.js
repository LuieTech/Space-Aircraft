class Aircraft{
    constructor(ctx, x, y){
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = 200;
        this.h = 50;

        this.x0 = this.x;
        this.xy = this.y;

        this.vx = 0;
        this.vy = 0;
        this.ax = AIR_ACCELERATION;
        this.ay = AIR_ACCELERATION;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/aircraft.png";
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 7;
        this.sprite.horizontalFrameIndex = 0;

        this.animationTick = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
        } 
    }
    


draw(){
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

    //this.weapon.draw();
  }

  move(){
    
  }
  animate(){
    this.animationTick++
    if(this.animationTick > AIRCRAFT_TICK){
        this.animationTick = 0;
        this.sprite.horizontalFrameIndex++
        console.log("aqui-1")
    }
    if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0;
        console.log("aqui-2")
      }
  }
} 
console.log()