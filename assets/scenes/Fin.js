export default class Fin extends Phaser.Scene {
  constructor() {

      super("fin");
  }

  init() {}

  preload () {}

  create () {

    this.add.image(400, 300, "fondo");

    const botonJugar = this.add.image(305, 400, 'botonPlay').setScale(0.9).setInteractive();
    const botonMenu = this.add.image(750, 50, 'botonAyuda').setScale(1).setInteractive();


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