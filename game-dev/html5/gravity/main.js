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

function Ball(x, y, dx, dy, r, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.color = color;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = () => {
    if(this.y + this.r + this.dy > canvas.height) {
      this.dy = - this.dy * friction;
      this.dx = this.dx * friction;
    } else {
      this.dy += gravity;
    }

    if(this.x + this.r > canvas.height || this.x - this.r < 0) {
      this.dx = - this.dx;
    }
    this.y += this.dy;
    this.x += this.dx;
    this.draw();
  };
}

let balls = [];
let n = 50;
let factor = 1;

function init() {
  balls = [];
  for(let i = 0; i < n; i++) {
    let radius = randomInitFromRange(20, 50);
    let x = randomInitFromRange(radius, canvas.width - radius);
    let y = randomInitFromRange(radius, canvas.height - radius);
    let dx = randomInitFromRange(-2, 2);
    let dy = randomInitFromRange(-2, 2);
    let color = randomColor(colors)
    let ball = new Ball(x, y, dx, dy, radius, color);
    balls.push(ball);
  }
}
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for(let i = 0; i < balls.length; i++) {
    if(balls[i]) {
      balls[i].update();
    }
  }
}
window.onload = () => {
  init();
};
animate();

window.addEventListener('click', () => init())
