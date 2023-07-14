class Aircraft{
    constructor(ctx, x, y){
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = 90;
        this.h = 55;

        this.x0 = this.x;
        this.xy = this.y;

        this.vx = 0;
        this.vy = 0;
        this.ax = X_AIR_ACCELERATION;
        this.ay = Y_AIR_ACCELERATION;
        this.weapon = new Weapon(this.ctx, this.x + this.w, this.y + this.h / 2);

        this.sprite = new Image();
        this.sprite.src = "./assets/img/aircraft.png";
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 5;
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

    this.weapon.draw();
  }

  onKeyDown(event){
    
    switch (event.keyCode) {
      case SPACE:
        this.weapon.shoot();
        break;
      case UP:
        if (this.vy > -3) this.vy -= this.ay
        break;
      case DOWN:
        if (this.vy < 3) this.vy += this.ay
        break;
      case LEFT:
        if (this.vx > -3) this.vx -= this.ax;
        break;
      case RIGHT:
        if (this.vx < 3) this.vx += this.ax;
        
        break;       
    }
  }
  onKeyUp(event) {
   
    switch(event.keyCode) {
      case UP:
      case DOWN:
        this.vy = 0;
        break;
      case LEFT:
      case RIGHT:
        this.vx = 0;
        break;    
    }
  }


  move(){
        
    this.x += this.vx;
    this.y += this.vy;

    this.weapon.x = this.x + this.w;
    this.weapon.y = this.y + this.h / 2;
    this.weapon.move();
    

    if (this.x < 0){
      this.x = 0;
    } else if ( this.x + this.w > this.ctx.canvas.width){
        this.x = this.ctx.canvas.width - this.w
    }
    if (this.y < 0){
        this.y = 0;
    } else if ( this.y + this.h > this.ctx.canvas.height){
        this.y = this.ctx.canvas.height - this.h
    }

  }

  animate(){
    this.animationTick++
    if(this.animationTick > AIRCRAFT_TICK){
        this.animationTick = 0;
        this.sprite.horizontalFrameIndex++
    }
    if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0;
        
      }
  }
} 
