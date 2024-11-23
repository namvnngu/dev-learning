let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

let mouse = {
  x: 0,
  y: 0,
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
function getDistance(x1, y1, x2, y2) {
  let xDistnace = x1 - x2;
  let yDistance = y1 - y2;
  return Math.sqrt(xDistnace * xDistnace + yDistance * yDistance);
}
function rotate(velocity, angle) {
  return {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };
}
function resolveCollision(ball, otherBall) {
  const xVelocityDiff = ball.vel.x - otherBall.vel.x;
  const yVelocityDiff = ball.vel.y - otherBall.vel.y;

  const xDist = otherBall.x - ball.x;
  const yDist = otherBall.y - ball.y;

  // console.log(xVelocityDiff, xDist)
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(otherBall.y - ball.y, otherBall.x - ball.x);

    // Store mass in var for better readability in collision equation
    const m1 = ball.m;
    const m2 = otherBall.m;

    // Velocity before equation
    const u1 = rotate(ball.vel, angle);
    const u2 = rotate(otherBall.vel, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    ball.vel.x = vFinal1.x;
    ball.vel.y = vFinal1.y;

    otherBall.vel.x = vFinal2.x;
    otherBall.vel.y = vFinal2.y;
  }
}

function Ball(x, y, dx, dy, r, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.vel = {
    x: this.dx,
    y: this.dy,
  };
  this.color = color;
  this.m = 1;
  this.opacity = 0.2;

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.closePath();
  };

  this.update = (balls) => {
    this.draw();

    for (let i = 0; i < balls.length; i++) {
      if (this === balls[i]) continue;
      if (
        getDistance(this.x, this.y, balls[i].x, balls[i].y) <
        this.r + balls[i].r
      ) {
        resolveCollision(this, balls[i])
      }
    }

    if (this.x - this.r < 0 || this.x + this.r > canvas.width) {
      this.vel.x = -this.vel.x;
    }
    if (this.y - this.r < 0 || this.y + this.r > canvas.height) {
      this.vel.y = -this.vel.y;
    }

    if(getDistance(mouse.x, mouse.y, this.x, this.y) < 200 && this.opacity <= 0.8) {
      this.opacity += 0.02;
    } else if (this.opacity > 0){
      this.opacity -= 0.02;

      this.opacity = Math.max(0.2, this.opacity);
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
  };
}

let balls = [];
let n = 50;
function init() {
  balls = [];
  for (let i = 0; i < n; i++) {
    let radius = randomInitFromRange(20, 50);
    let x = randomInitFromRange(radius, canvas.width - radius);
    let y = randomInitFromRange(radius, canvas.height - radius);
    let dx = randomInitFromRange(-2, 2);
    let dy = randomInitFromRange(-2, 2);
    let color = randomColor(colors);
    let isCollided = false;

    if (i !== 0) {
      for (let j = 0; j < balls.length; j++) {
        if (getDistance(x, y, balls[j].x, balls[j].y) < radius + balls[j].r) {
          x = randomInitFromRange(radius, canvas.width - radius);
          y = randomInitFromRange(radius, canvas.height - radius);
          j = -1;
        }
      }
    }
    let ball = new Ball(x, y, dx, dy, radius, color);
    balls.push(ball);
  }
}
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < balls.length; i++) {
    if (balls[i]) {
      balls[i].update(balls);
    }
  }
}
window.onload = () => {
  init();
};
animate();

window.addEventListener("click", () => init());
