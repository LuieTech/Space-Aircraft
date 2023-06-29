class Game{
    constructor(canvasId){
        
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.intervalid = undefined;
        this.fps = 60;
        
        this.background = new Background(this.ctx);
        this.aircraft = new Aircraft(this.ctx, 100, 100);
        console.log(this.aircraft.sprite)
        this.tick = 0;

    }

    start(){
        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
            }, 1000/this.fps)
        }
    }

    stop(){
        clearInterval(this.intervalId);
        this.intervalId = undefined
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    move(){
        this.background.move();
        //this.aircraft.move();
    }
    draw(){
        this.background.draw();
        this.aircraft.draw();

    }
}