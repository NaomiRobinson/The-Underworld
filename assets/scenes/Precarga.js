export default class Precarga extends Phaser.Scene {

  constructor() {
    super("precarga");
  }

  preload() {

    this.load.image("fondo", "./assets/images/fondo.png");
    this.load.image("fondoayuda", "./assets/images/fondoayuda.png");
    this.load.image("capa1", "./assets/images/capa1.png");
    this.load.image("capa2", "./assets/images/capa2.png");
    this.load.image("capa3", "./assets/images/capa3.png");
    this.load.image("volveratras", "./assets/images/volveratras.png");
    this.load.image("botonPlay", "./assets/images/play.png");
    this.load.image("pelo", "./assets/images/chica.png");
    this.load.image("ladrillos", "./assets/images/ladrillos.png");
    this.load.image("titulo", "./assets/images/titulo.png");
    this.load.image("botonAyuda", "./assets/images/ayuda.png");
    this.load.image("recuadro", "./assets/images/recuadro.png");
    
    this.load.image("plataforma", "./assets/images/plataforma.png");
    this.load.image("jugador", "./assets/images/jugador.png");
    this.load.image("ojo", "./assets/images/ojo.png");
    this.load.image("fantasma", "./assets/images/fantasma.png")
    this.load.image("fuego", "./assets/imagess/fuego.png");
    this.load.image("moneda", "./assets/images/moneda.png");
    this.load.image("caliz", "./assets/images/caliz.png");
    this.load.image("corona", "./assets/images/corona.png");
    this.load.image("gema", "./assets/images/gema.png");
    this.load.image("anillo", "./assets/images/anillo.png");

    this.load.image("botonreplay", "./assets/images/replay.png");
    this.load.image("botonmenu", "./assets/images/menu.png");

    this.load.image("vidaExtra", "./assets/images/vidaextra.png");

    this.load.spritesheet("personaje", "./assets/images/personaje.png", {
      frameWidth: 171,
      frameHeight: 240,
    });

    this.load.spritesheet("animacionintro", "./assets/images/animacionintro.png", {
      frameWidth: 800,
      frameHeight: 600,
    });

  }


  create() {
    this.anims.create({
      key: "correr",
      frames: this.anims.generateFrameNumbers("personaje", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1, 
    }); 
    this.anims.create({
      key: "animacion",
      frames: this.anims.generateFrameNumbers("animacionintro", { start: 0, end: 3 }),
      frameRate: 100,
      repeat: 0, 
    }); 
    this.scene.start("menu");
  }
}
