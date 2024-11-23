let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
const center = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
let angle = 0;

window.addEventListener("mousemove", (e) => {
  gsap.to(mouse, { 
    x: e.x - canvas.width / 2, 
    y: e.y - canvas.height / 2,
    duration: 1
  });
  angle = Math.atan2(mouse.y, mouse.x);
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

function Particle(x, y, r, color, d) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;
  this.d = d;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = (timer) => {
    this.x = center.x + this.d * Math.cos(angle) * Math.sin(d + timer);
    this.y = center.y + this.d * Math.sin(angle) *  Math.cos(d + timer);
    // this.x = center.x + this.d * Math.cos(angle);
    // this.y = center.y + this.d * Math.sin(angle);
    this.draw();
  };
}

let particles = [];
let n = 300;

function init() {
  particles = [];
  for (let i = 0; i < n; i++) {
    const x = canvas.width / 2 + i * Math.cos(Math.PI);
    const y = canvas.height / 2 + i * Math.sin(Math.PI);
    const color = `hsl(${(i / n) * 360}, 50%, 50%)`;
    const radius = (n - i) / n * 3; 
    particles.push(new Particle(x, y, radius, color, i));
  }
}

let timer = 0;
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < particles.length; i++) {
    if (particles[i]) {
      particles[i].update(timer);
    }
  }
  timer += 0.001;
}
window.onload = () => {
  init();
};
animate();

window.addEventListener("click", () => init());
