export default class Ayuda extends Phaser.Scene {
    constructor() {

      super("ayuda");
    }

    init() {}

    preload () {}

    create () {

      this.add.image(400,300, "rectangulo").setScale(0.9);
      const botonAyuda = this.add.image(750, 50, 'botonAyuda').setScale(1).setInteractive();

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