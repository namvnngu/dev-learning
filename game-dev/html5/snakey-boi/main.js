let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
noise.seed(Math.random());

let ctx = canvas.getContext("2d");

let mouse = {
  x: null,
  y: null,
};
let colors = ["#023859", "#D9B504", "#D97904", "#BF3604", "#400601"];
let gravity = 1;

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

function Particle(x, y, r, color, offset) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;
  this.offset = offset;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };

  this.update = (time) => {
    this.x +=
      noise.simplex2(time + this.offset + 20, time + this.offset) * 5;
    this.y += noise.simplex2(time + this.offset, time + this.offset) * 5;
    
    this.draw();
  };
}

let particles = [];
let n = 30;

function init() {
  particles = [];
  for (let i = 0; i < n; i++) {
    // let color = randomColor(colors);
    let color = `hsl(${Math.floor(Math.random() * 255)}, 100%, 50%)`
    let particle = new Particle(
      canvas.width / 2,
      canvas.height / 2,
      10,
      color,
      i * 0.01
    );
    particles.push(particle);
  }
}

let time = 0;
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < particles.length; i++) {
    if (particles[i]) {
      particles[i].update(time);
    }
  }
  time += 0.005;
}
window.onload = () => {
  init();
};
animate();

window.addEventListener("click", () => init());
