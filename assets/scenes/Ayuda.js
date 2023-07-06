export default class Ayuda extends Phaser.Scene {
    constructor() {

      super("ayuda");
    }

    init() {}

    preload () {}

    create () {

    this.fondo = this.add.tileSprite(400, 300, 800, 600, "ladrillos");
    this.fondo.setScrollFactor(0.5);
    this.fondo.setTileScale(0.9); 
    this.fondo.setTilePosition(400, 300);

    this.add.image(400,300, "fondoayuda").setScale(0.8);

      const sonidoSeleccion = this.sound.add("seleccionMenu");

      
      this.botonVolver = this.add.sprite(90,90, 'flecha').setScale(1.3).setInteractive();
      this.botonVolver.flipX = true;

      this.botonVolver.on("pointerover", () => {
        this.game.canvas.style.cursor = "pointer"
        this.botonVolver.setFrame(1); 
    });
    
    this.botonVolver.on("pointerout", () => {
        this.game.canvas.style.cursor = "default";
        this.botonVolver.setFrame(0); 
    });
    
    this.botonVolver.on("pointerdown", () => {
        this.game.canvas.style.cursor = "default";
        sonidoSeleccion.play();
        this.scene.start("menu");
    });

    }

    update() {
      this.fondo.tilePositionX += 0.2;
    }

}