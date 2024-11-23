let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
let colors = ["#023859", "#D9B504", "#D97904", "#BF3604", "#400601"];
let mouseDown = false;

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  init();
});

window.addEventListener("mousedown", () => {
  mouseDown = true;
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});

// Utility
function randomInitFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function Particle(x, y, r, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };

  this.update = () => {
    this.draw();
  };
}

let particles = [];
let n = 500;

function init() {
  particles = [];
  for (let i = 0; i < n; i++) {
    const canvasWidth = canvas.width + 300;
    const canvasHeight = canvas.height + 300;
    const x = (Math.random() * canvasWidth) - canvasWidth / 2;
    const y = (Math.random() * canvasHeight) - canvasHeight / 2;
    const radius = Math.random() * 2;
    particles.push(new Particle(x, y, radius, randomColor(colors)));
  }
}

let radians = 0;
let alpha = 1
let vel = 0.001;
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = `rgba(10,10,10, ${alpha})`;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(radians);
  for (let i = 0; i < particles.length; i++) {
    if (particles[i]) {
      particles[i].update();
    }
  }
  ctx.restore();

  radians += vel;

  if(mouseDown && alpha >= 0.03) {
    vel += 0.0001;
    vel = Math.min(vel, 0.01);
    alpha -= 0.01;
  } else if(!mouseDown && alpha < 1) {
    alpha += 0.01;
    vel -= 0.0001;
    vel = Math.max(vel, 0.001);
  }
}
init();
animate();
