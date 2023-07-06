  export default class Menu extends Phaser.Scene {
    constructor() {

      super("menu");
    }

  preload() {}

  create() {

    this.sound.stopAll();

    const musicaMenu = this.sound.add("musicaMenu");
    musicaMenu.play();
    musicaMenu.setLoop(true);

    const sonidoSeleccion = this.sound.add("seleccionMenu");

    this.fondo = this.add.tileSprite(400, 300, 800, 600, "ladrillos");
    this.fondo.setTileScale(0.9); 
    this.fondo.setTilePosition(400, 300);

    const botonJugar = this.add.image(400, 300, "titulo").setScale(1).setInteractive();
    const botonAyuda = this.add.sprite(750, 50, "botonAyuda").setScale(1).setInteractive();

    

    botonJugar.on("pointerover", () => {
      this.game.canvas.style.cursor = "pointer"
      botonJugar.setFrame(1);
  });

  botonJugar.on("pointerout", () => {
      this.game.canvas.style.cursor = "default";
      botonJugar.setFrame(0);
  });
  
  botonJugar.on("pointerdown", () => {
      this.game.canvas.style.cursor = "default";
      sonidoSeleccion.play();
      this.scene.start("intro");
  });



  botonAyuda.on("pointerover", () => {
    this.game.canvas.style.cursor = "pointer"
    botonAyuda.setFrame(1);
});

botonAyuda.on("pointerout", () => {
    this.game.canvas.style.cursor = "default";
    botonAyuda.setFrame(0);
});

botonAyuda.on("pointerdown", () => {
    this.game.canvas.style.cursor = "default";
    sonidoSeleccion.play();
    this.scene.start("ayuda");
});
  }


  update() {
    this.fondo.tilePositionX += 0.2;
  }

  } 
