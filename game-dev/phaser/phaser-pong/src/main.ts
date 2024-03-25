import * as Phaser from "phaser";
import TitleScreen from "./scenes/TitleScreen";
import Game from "./scenes/Game";

const config: Phaser.Types.Core.GameConfig = {
  width: 800,
  height: 500,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  }
};

const game = new Phaser.Game(config);

game.scene.add("titleScreen", TitleScreen);
game.scene.add("game", Game);

// game.scene.start("titleScreen");
game.scene.start("game");
