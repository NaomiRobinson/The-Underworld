export default class Fin extends Phaser.Scene {
    constructor() {

      super("fin");
    }

    init() {}

    preload () {}

    create () {
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
  
    botonAyuda.on("pointerover", () => {
      this.game.canvas.style.cursor = "pointer"
  });
  
  botonAyuda.on("pointerout", () => {
      this.game.canvas.style.cursor = "default";
  });
  
  botonAyuda.on("pointerdown", () => {
      this.game.canvas.style.cursor = "default";
      this.scene.start("menu");
  });
    }

    update () {}

}