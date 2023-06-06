  export default class Menu extends Phaser.Scene {
    constructor() {

      super("menu");
    }

  init() {}  //ver si es necesario   

  preload() {
    this.load.image("fondo", "./assets/images/fondo.png");
    this.load.image("boton", "./assets/images/boton.png");
  }

  create() {

    this.add.image(400, 300, "fondo");
    const botonJugar = this.add.image(400, 230, 'boton').setScale(0.5).setInteractive();

    botonJugar.on("pointerdown", () => {
      this.scene.start("etapa1");
    });

  }


  update() {}

  } 
