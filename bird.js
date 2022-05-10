const birdSprite = new Image();
birdSprite.src = "bird.png";
class Bird {
    constructor(x, y, width, height) {
        this.x = 150;
        this.y = 200;
        this.velocityY = 0;
        this.originalWidth = 941;
        this.originalHeight = 680;
        this.width = this.originalWidth / 20;
        this.height = this.originalHeight / 20;
        this.gravity = 0.5;
        this.frameX = 0;
    }
    update() {
        let curve = Math.sin(angle * 20);
        if (this.y > canvas.height - this.height * 3 + curve) {
            this.y = canvas.height - this.height * 3 + curve;
            this.velocityY = 0;
        } else {
            this.velocityY += this.gravity;
            this.velocityY *= 0.9;
            this.y += this.velocityY;
        }
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.velocityY = 0;
        }
        if (spacePressed && this.y > this.height + 3) this.jump();
    }
    draw() {
        // ctx.fillStyle = "red ";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
            birdSprite,
            this.frameX * this.originalWidth,
            0,
            this.originalWidth,
            this.originalHeight,
            this.x - 20,
            this.y - 12,
            this.width * 1.7,
            this.height * 1.7
        );
    }
    jump() {
        this.velocityY = -10;
        if (this.frameX >= 3) this.frameX = 0;
        else if (frame % 2 === 0) this.frameX++;
    }
}
const bird = new Bird();
