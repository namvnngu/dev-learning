let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

let mouse = {
  x: null,
  y: null,
};
let maxRadius = 40;
let minRadius = 1;
let colors = ["#023859", "#D9B504", "#D97904", "#BF3604", "#400601"];
let gravity = 1;
let friction = 0.99;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  init();
});

// Utility
function randomInitFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function Particle(x, y, dx, dy, r, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.distanceFromCenter = randomInitFromRange(50, 120);
  this.lastMouse = {x, y};

  this.draw = (lastPoint) => {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.r;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.closePath();
  };

  this.update = () => {
    const lastPoint = {
      x: this.x,
      y: this.y,
    }

    // Move points over time
    this.radians += this.velocity;
    
    // Drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    // Circular motion
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

    this.draw(lastPoint);
  };
}

let particles = [];
let n = 50;
let factor = 1;

function init() {
  particles = [];
  for (let i = 0; i < n; i++) {
    let radius = randomInitFromRange(1, 5);
    // let x = canvas.width / 2;
    // let y = canvas.height / 2;
    let x = randomInitFromRange(radius, canvas.width - radius);
    let y = randomInitFromRange(radius, canvas.height - radius);
    let dx = randomInitFromRange(-2, 2);
    let dy = randomInitFromRange(-2, 2);
    let color = randomColor(colors);
    let particle = new Particle(x, y, dx, dy, radius, color);
    particles.push(particle);
  }
}
function animate() {
  requestAnimationFrame(animate);
  // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    if (particles[i]) {
      particles[i].update();
    }
  }
}
window.onload = () => {
  init();
};
animate();

window.addEventListener("click", () => init());
