const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const car = {
    x: 500,
    y: 400,
    angle: -Math.PI / 2,

    speed: 0,
    maxSpeed: 18,

    accel: 0.12,
    brake: 0.25,

    grip: 0.04,

    width: 12,
    length: 30
};

const keys = {};

let lapStart = performance.now();
let bestLap = null;
let delta = 0;

let ghostLap = [];
let currentLap = [];

document.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

function updatePhysics() {

    const downforce =
        car.speed * car.speed * 0.002;

    const actualGrip =
        car.grip + downforce;

    if(keys["w"])
        car.speed += car.accel;

    if(keys["s"])
        car.speed -= car.brake;

    car.speed *= 0.992;

    if(car.speed > car.maxSpeed)
        car.speed = car.maxSpeed;

    if(car.speed < -4)
        car.speed = -4;

    const steering =
        0.04 *
        (1 + actualGrip);

    if(keys["a"])
        car.angle -= steering;

    if(keys["d"])
        car.angle += steering;

    car.x += Math.cos(car.angle) * car.speed;
    car.y += Math.sin(car.angle) * car.speed;

    currentLap.push({
        x: car.x,
        y: car.y
    });
}

function drawTrack() {

    ctx.strokeStyle = "#555";
    ctx.lineWidth = 120;

    ctx.beginPath();

    ctx.moveTo(200,200);
    ctx.lineTo(800,150);
    ctx.lineTo(900,350);
    ctx.lineTo(750,650);
    ctx.
