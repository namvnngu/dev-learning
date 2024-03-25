let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

// Rectangle
ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
ctx.fillRect(100, 100, 100, 100);

// Line
ctx.beginPath();
ctx.moveTo(300, 150);
ctx.lineTo(320, 350);
ctx.strokeStyle = "#fa34a3";
ctx.stroke();

// Arc/Circle
ctx.beginPath();
ctx.arc(200, 400, 30, 0, Math.PI * 2, false);
ctx.strokeStyle = "blue";
ctx.stroke();

// Animation
let mouse = {
  x: null,
  y: null,
};
let maxRadius = 40;
let minRadius = 1;
let colors = ["#023859", "#D9B504", "#D97904", "#BF3604", "#400601"];

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  init();
});

function Circle(x, y, dx, dy, r) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.minRadius = r;
  this.color = colors[Math.round(Math.random() * colors.length)];

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = () => {
    if (this.x > innerWidth - r || this.x < r) {
      this.dx *= -1;
    }
    if (this.y > innerHeight - r || this.y < r) {
      this.dy *= -1;
    }

    this.y += this.dy;
    this.x += this.dx;

    // Interactivity
    if (
      Math.abs(mouse.x - this.x) < this.r + 50 &&
      Math.abs(mouse.y - this.y) < this.r + 50 &&
      this.r < maxRadius
    ) {
      this.r += 1;
      this.color = colors[Math.round(Math.random() * colors.length)];
    } else if (this.r > this.minRadius) {
      this.r -= 1;
    }

    this.draw();
  };
}

let circles = [];
let n = 500;
let factor = 1;

function init() {
  circles = []
  for (let i = 0; i < n; i++) {
    let r = Math.random() * 5 + minRadius;
    let x = Math.random() * (innerWidth - 2 * r) + r;
    let y = Math.random() * (innerHeight - 2 * r) + r;
    let dx = (Math.random() - 0.5) * factor;
    let dy = (Math.random() - 0.5) * factor;
    let circle = new Circle(x, y, dx, dy, r);
    circles.push(circle);
  }
}
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
  }
}
animate();
window.onload = () => {
  init();
}
