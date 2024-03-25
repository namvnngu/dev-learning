let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

let mouse = {
  x: canvas.width,
  y: canvas.height,
};
let gravity = 0.05;
let friction = 0.99;

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

function Particle(x, y, r, color, velocity) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;
  this.opacity = 1;
  this.velocity = velocity;

  this.draw = () => {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };

  this.update = () => {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.opacity -= 0.005;
  };
}

let particles = [];
let n = 500;
const power = 8;

function init(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  // particles = [];

  const angleIncrement = (Math.PI * 2) / n;

  for (let i = 0; i < n; i++) {
    particles.push(
      new Particle(
        mouse.x,
        mouse.y,
        3,
        `hsl(${Math.floor(Math.random() * 360)}, 50%,50%)`,
        {
          x: Math.cos(angleIncrement * i) * Math.random() * power,
          y: Math.sin(angleIncrement * i) * Math.random() * power,
        }
      )
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < particles.length; i++) {
    if (particles[i]) {
      if (particles[i].opacity > 0) {
        particles[i].update();
      } else {
        particles.splice(i, 1);
      }
    }
  }
}
animate();

window.addEventListener("click", init);
