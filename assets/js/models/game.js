class Game{
    constructor(canvasId){
        
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.intervalId = undefined;
        this.fps = 60;
        
        this.background = new Background(this.ctx);
        this.aircraft = new Aircraft(this.ctx, 50, 50);
        this.enemies = [];
        this.greens = [];
        this.info = new Info(this.ctx)
        this.audio = new Audio("/assets/audio/suspense-686.wav")
        this.audio.volume = 0.1;
        this.monsterAudio = new Audio("/assets/audio/monsterSound.wav");
        this.monsterAudio.volume = 0.1;
        this.gameOverAudio = new Audio("/assets/audio/gameOverSound.mp3")
        this.gameOverAudio.volume = 0.1;
        this.tickAliens = 0;
        this.tickGreens = 0;
        this.tickMonster = 0;
        this.finalShoot = 0;

    }

    start(){
        this.addAlien()
        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.checkBulletCollisionToEnemies();
                this.checkBulletCollisionToGreens();
                this.checkBulletCollisionToMonsterBullet()
                this.checkBulletCollisionToMonster()
                this.checkMonsterBulletCollision(); 
                this.checkEnemiesCollision();
                this.checkGreensCollision();
                this.checkMonsterCollision()
                this.gameOver();
                this.clearAliens();
                this.aircraft.weapon.clearBullets();
                this.audio.play()
                if(this.tickAliens > 120){
                    this.addAlien()
                    this.tickAliens = 0;
                    
                }
                if(this.tickGreens > 150){
                    this.addGreens();
                    this.tickGreens = 0;
                    
                }
                if(this.info.score === 2){
                    this.addMonster();
                    
                    
                }
                if(this.tickMonster > 160 && this.monster){
                    this.monster.shoot();
                    this.tickMonster = 0;
                   
                }
                this.tickAliens++;
                this.tickGreens++;
                this.tickMonster++
            }, 1000/this.fps)
        }
    }

    addAlien(){
        let y = Math.floor(Math.random() * this.canvas.height);
        if (y + ALIEN_HEIGHT > this.canvas.height) {
            y = this.canvas.height - ALIEN_HEIGHT;
        }

        this.enemies.push(new Alien(this.ctx, y))
    }

    addGreens() {

        let y = Math.floor(Math.random() * this.canvas.height);
        if (y + GREENS_HEIGHT > this.canvas.height) {
            y = this.canvas.height - GREENS_HEIGHT;
        }
        this.greens.push(new Greens(this.ctx, y))
    }

    addMonster(){
        this.monster = new Monster(this.ctx)
        this.monsterAudio.play()
    }

    checkEnemiesCollision() {
        const craft = this.aircraft;
        this.enemies.forEach((eBody) => {
            if (!eBody.active) return;

            const colx = craft.x + craft.w > eBody.x && craft.x < eBody.x + eBody.w;
            const coly = craft.y + craft.h > eBody.y && craft.y < eBody.y + eBody.h;

            if (colx && coly) {
                
                this.info.lives--
                eBody.active = false;
                               
            }
        })
    }

    checkGreensCollision() {
        const craft = this.aircraft;
        this.greens.forEach((green) => {
            if (!green.active) return;

            const colx = craft.x + craft.w > green.x && craft.x < green.x + green.w;
            const coly = craft.y + craft.h > green.y && craft.y < green.y + green.h;

            if (colx && coly) {
                
                this.info.lives--
                green.active = false;
                
            }

        })
    }

    checkMonsterCollision(){
        if(this.monster){
            const craft = this.aircraft;
            const mon = this.monster;

            const colx = craft.x + craft.w > mon.x && craft.x < mon.x + mon.w;
            const coly = craft.y + craft.h > mon.y && craft.y < mon.y + mon.h;

            if(colx && coly){
                this.stop();
                this.gameOverAudio.play()
            }

        }
    }

    checkMonsterBulletCollision() {
        if(this.monster){
        const craft = this.aircraft;
        this.monster.monsterWeapon.bullets.forEach((mb) => {
            if (!mb.active) return;

            const colx = craft.x + craft.w > mb.x && craft.x < mb.x + mb.w;
            const coly = craft.y + craft.h > mb.y && craft.y < mb.y + mb.h;

            if (colx && coly) {
                
                this.info.lives--
                mb.active = false;
            }
        })
    }
    }

    checkBulletCollisionToMonster(){
        if(this.monster){
        this.aircraft.weapon.bullets.forEach((bullet, bulletIndex) => {

                const mon = this.monster
            
                const colx = bullet.x + bullet.r > mon.x && bullet.x < mon.x + mon.w;
                const coly = bullet.y + bullet.r > mon.y && bullet.y < mon.y + mon.h;

                if(colx && coly) {
    
                    this.aircraft.weapon.bullets.splice(bulletIndex, 1)
                    this.finalShoot++
                    this.info.score++

                    if(this.finalShoot === 5){
                        this.stop();
                        
                    }

                }
            
        })
    }
    }

    checkBulletCollisionToEnemies(){
        this.aircraft.weapon.bullets.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((aBody, alienIndex) => {
                const colx = bullet.x + bullet.r > aBody.x && bullet.x < aBody.x + aBody.w;
                const coly = bullet.y + bullet.r > aBody.y && bullet.y < aBody.y + aBody.h;

                if(colx && coly) {
                    this.enemies.splice(alienIndex, 1);
                    this.aircraft.weapon.bullets.splice(bulletIndex, 1)
                    this.info.score++

                }
            })
        })
    }
    checkBulletCollisionToGreens(){
        this.aircraft.weapon.bullets.forEach((bullet, bulletIndex) => {
            this.greens.forEach((gBody, greenIndex) => {
                const colx = bullet.x + bullet.r > gBody.x && bullet.x < gBody.x + gBody.w;
                const coly = bullet.y + bullet.r > gBody.y && bullet.y < gBody.y + gBody.h;

                if(colx && coly) {
                    this.greens.splice(greenIndex, 1);
                    this.aircraft.weapon.bullets.splice(bulletIndex, 1)
                    this.info.score++

                }
            })
        })
    }

    checkBulletCollisionToMonsterBullet(){
        if(this.monster){
        this.aircraft.weapon.bullets.forEach((bullet, bulletIndex) => {
            this.monster.monsterWeapon.bullets.forEach((mb, mbIndex) => {
                const colx = bullet.x + bullet.r > mb.x && bullet.x < mb.x + mb.w;
                const coly = bullet.y + bullet.r > mb.y && bullet.y < mb.y + mb.h;

                if(colx && coly) {
                    this.monster.monsterWeapon.bullets.splice(mbIndex, 1);
                    this.aircraft.weapon.bullets.splice(bulletIndex, 1)
                    this.info.score++
                }
            })
        })
    }
    }

    gameOver(){

        if(this.info.lives === 0){
            
            this.gameOverAudio.play();
            this.stop();
        }
        
    }
    
    stop(){
        
        clearInterval(this.intervalId);
        this.draw();
        this.intervalId = undefined 
        this.audio.pause();        
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clearAliens() {
        this.enemies = this.enemies.filter(alien => alien.isVisible())
        this.greens = this.greens.filter(green => green.isVisible())
    }

    move(){
        this.background.move();
        this.aircraft.move();
        this.enemies.forEach(alien => alien.move());
        this.greens.forEach(green => green.move());
        if(this.monster){
        this.monster.move();
        }
    }
    draw(){
        this.background.draw();
        this.aircraft.draw();
        this.enemies.forEach(alien => alien.draw());
        this.greens.forEach(green => green.draw())
        this.info.draw()
        if(this.monster){
            this.monster.draw();
            }  

    }

    onKeyDown(event) {
        this.aircraft.onKeyDown(event);
      }
    
      onKeyUp(event) {
        this.aircraft.onKeyUp(event);
      }
}