// @ts-nocheck
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let Hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop(0.4, "red");
gradient.addColorStop(0.6, "yellow");
gradient.addColorStop(0.8, "green");
gradient.addColorStop(1, "blue");

const background = new Image();
background.src = "BG.png";
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height,
};

function handleBackground() {
    if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
    else BG.x1 -= gamespeed;
    if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
    else BG.x2 -= gamespeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillRect(10, canvas.height - 90, 50, 50);
    handleBackground();
    bird.update();
    bird.draw();
    handlePartticles();
    handlePipes();
    ctx.fillStyle = gradient;
    ctx.font = "90px roboto";
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    handleCollision();
    if (handleCollision()) return;
    requestAnimationFrame(animate);
    angle += 0.12;
    frame++;
}
animate();

window.addEventListener("keydown", function (e) {
    if (e.code === "Space") spacePressed = true;
});
window.addEventListener("keyup", function (e) {
    if (e.code === "Space") spacePressed = false;
    bird.frameX = 0;
});

// make it for movile devices
window.addEventListener("touchstart", function (e) {
    spacePressed = true;
});
window.addEventListener("touchend", function (e) {
    spacePressed = false;
    bird.frameX = 0;
});

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const collision = new Image();
collision.src = "bang.png";
function handleCollision() {
    for (let i = 0; i < pipesArray.length; i++) {
        if (
            bird.x < pipesArray[i].x + pipesArray[i].width &&
            bird.x + bird.width > pipesArray[i].x &&
            ((bird.y < 0 + pipesArray[i].top && bird.y + bird.height > 0) ||
                (bird.y > canvas.height - pipesArray[i].bottom &&
                    bird.y + bird.height < canvas.height))
        ) {
            // collision detected
            ctx.drawImage(collision, bird.x, bird.y, 50, 50);
            ctx.font = "30px roboto";
            ctx.fillStyle = "black";
            ctx.fillText(
                `Game Over, your score is ${score}`,
                canvas.width / 2 - 100,
                canvas.height / 2
            );
            return true;
        }
    }
}
