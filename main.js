import Menu from "./assets/scenes/Menu.js";
import Intro from "./assets/scenes/Intro.js";
import Ayuda from "./assets/scenes/Ayuda.js";
import Etapa1 from "./assets/scenes/Etapa1.js";
import Etapa2 from "./assets/scenes/Etapa2.js";
import Fin from "./assets/scenes/Fin.js"; 
import Precarga from "./assets/scenes/Precarga.js";
import Etapa1inicio from "./assets/scenes/Etapa1Inicio.js";


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
      gravity: { y: 3490 },
      debug: true,
    },
  },
 
  scene: [Precarga,Menu,Ayuda,Intro,Etapa1inicio,Etapa1,Etapa2,Fin],
};


window.game = new Phaser.Game(config);
