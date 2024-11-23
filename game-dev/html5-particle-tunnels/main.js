let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

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

function Particle(x, y, r, color, velocity) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;
  this.velocity = velocity;
  this.ttl = 1000;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = () => {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl--;
    this.draw();
  };
}

let particles = [];
let n = 100;
const factor = 100;
let hueRadian = 0;
let hue = 0;

function init() {
  particles = [];
  
}
function generateRing() {
  setTimeout(generateRing, 200);
  for (let i = 0; i < n; i++) {
    hue = Math.sin(hueRadian);
    const radian = (Math.PI * 2) / n;
    const x = mouse.x;
    const y = mouse.y;
    const color = `hsl(${Math.abs(hue * 360)}, 50%, 50%)`
    particles.push(
      new Particle(x, y, 5, color, {
        x: Math.cos(radian * i) * 3,
        y: Math.sin(radian * i) * 3,
      })
    );
  }
  hueRadian += 0.01;
}
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < particles.length; i++) {
    if (particles[i]) {
      if(particles[i].ttl < 0) {
        particles.splice(i, 1);
      }
      particles[i].update();
    }
  }
}
animate();
generateRing();