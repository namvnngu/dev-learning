import * as Phaser from "phaser";

export default class Game extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private paddleLeft: Phaser.GameObjects.Rectangle | null = null;

  preload() { }

  create() {
    // Ball
    const ball = this.add.circle(400, 250, 10, 0xffffff, 1);

    this.physics.add.existing(ball);

    if ("setVelocity" in ball.body) {
      ball.body.setBounce(1, 1);
      ball.body.setCollideWorldBounds(true, 1, 1);
      ball.body.setVelocity(-200, 0);
    }

    // Left Paddle
    this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1);
    this.physics.add.existing(this.paddleLeft, true);

    // Miscellanous
    this.physics.add.collider(this.paddleLeft, ball);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.paddleLeft && "updateFromGameObject" in this.paddleLeft.body) {
      if (this.cursors && this.cursors.up.isDown) {
        this.paddleLeft.y -= 10;
        this.paddleLeft.body.updateFromGameObject();
      } else if (this.cursors && this.cursors.down.isDown) {
        this.paddleLeft.y += 10;
        this.paddleLeft.body.updateFromGameObject();
      }
    }
  }
}
