export default class Fin extends Phaser.Scene {
  constructor() {

      super("fin");
  }

  init() {}

  preload () {}

  create () {

    this.add.image(400, 300, "rectangulo").setScale(0.9);

    const botonJugar = this.add.image(305, 400, 'botonreplay').setScale(0.5).setInteractive();
    const botonMenu = this.add.image(500, 400,  'botonmenu').setScale(0.5).setInteractive();


    botonJugar.on("pointerover", () => {
        this.game.canvas.style.cursor = "pointer"
    });
  
    botonJugar.on("pointerout", () => {
        this.game.canvas.style.cursor = "default";
    });
    
    botonJugar.on("pointerdown", () => {
      this.game.canvas.style.cursor = "default";
      this.scene.start("etapa1");
    });
  
  //ir al menu principal
  
    botonMenu.on("pointerover", () => {
      this.game.canvas.style.cursor = "pointer"
    });
  
    botonMenu.on("pointerout", () => {
      this.game.canvas.style.cursor = "default";
    });
  
    botonMenu.on("pointerdown", () => {
      this.game.canvas.style.cursor = "default";
      this.scene.start("menu");
    });
  }

  update () {}

}