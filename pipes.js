const pipesArray = [];

class Pipes {
    constructor() {
        this.top = (Math.random() * canvas.height) / 3 + 20;
        this.bottom = (Math.random() * canvas.height) / 3 + 20;
        this.x = canvas.width;
        this.width = 20;
        this.color = "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)";
        this.counter = false;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(
            this.x,
            canvas.height - this.bottom,
            this.width,
            this.bottom
        );
    }
    update() {
        this.x -= gamespeed;
        if (!this.counter   && this.x < bird.x) {
            score++;
            this.counter = true;
        }
        this.draw();
    }
}

function handlePipes() {
    if (frame % 100 === 0) {
        pipesArray.unshift(new Pipes());
    }
    for (let i = 0; i < pipesArray.length; i++) {
        pipesArray[i].update();
        // esta forma usa slice y borra segun el ancho de la pantalla
        // if (pipesArray[ i ].x < -pipesArray[ i ].width) {
        //     pipesArray.splice(i, 1);
        // }
    }
    if (pipesArray.length > 20) {
        pipesArray.pop(pipesArray[0]);
    }
}
