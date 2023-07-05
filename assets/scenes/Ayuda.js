export default class Ayuda extends Phaser.Scene {
    constructor() {

      super("ayuda");
    }

    init() {}

    preload () {}

    create () {

      const sonidoSeleccion = this.sound.add("seleccionMenu");

      this.add.image(400,300, "fondoayuda").setScale(0.65);
      const botonAtras = this.add.image(60 , 50, 'volveratras').setScale(0.6).setInteractive();

      botonAtras.on("pointerover", () => {
        this.game.canvas.style.cursor = "pointer"
    });
    
    botonAtras.on("pointerout", () => {
        this.game.canvas.style.cursor = "default";
    });
    
    botonAtras.on("pointerdown", () => {
        this.game.canvas.style.cursor = "default";
        sonidoSeleccion.play();
        this.scene.start("menu");
    });

    }

    update () {}

}