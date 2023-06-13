import Menu from "./assets/scenes/Menu.js";
import Intro from "./assets/scenes/Intro.js";
import Ayuda from "./assets/scenes/Ayuda.js";
import Etapa1 from "./assets/scenes/Etapa1.js";
import Etapa2 from "./assets/scenes/Etapa2.js";
import Fin from "./assets/scenes/Fin.js"; 
import Precarga from "./assets/scenes/Precarga.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Precarga,Menu,Ayuda,Intro,Etapa1,Etapa2,Fin],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
