  export default class Menu extends Phaser.Scene {
    constructor() {

      super("menu");
    }

  preload() {

  }

  create() {

    this.sound.stopAll();

    const musicaMenu = this.sound.add("musicaMenu");
    musicaMenu.play();
    musicaMenu.setLoop(true);

    const sonidoSeleccion = this.sound.add("seleccionMenu");
    
    

    // this.add.image(400, 300, "fondo");
    // this.add.image(400,300, "ladrillos");
    // this.add.image(400,300, "pelo");
    

 this.fondo = this.add.tileSprite(400, 300, 800, 600, "ladrillos");
    this.fondo.setScrollFactor(0.5);
    this.fondo.setTileScale(0.9); 
    this.fondo.setTilePosition(400, 300);

    this.add.image(526,480, "titulo").setScale(1.4);  

    const botonJugar = this.add.image(350, 450, 'botonPlay').setScale(0.7).setInteractive();
    const botonAyuda = this.add.image(490, 450, 'botonAyuda').setScale(1).setInteractive();

    

    botonJugar.on("pointerover", () => {
      this.game.canvas.style.cursor = "pointer"
  });

  botonJugar.on("pointerout", () => {
      this.game.canvas.style.cursor = "default";
  });
  
  botonJugar.on("pointerdown", () => {
      this.game.canvas.style.cursor = "default";
      sonidoSeleccion.play();
      this.scene.start("intro");
  });



  botonAyuda.on("pointerover", () => {
    this.game.canvas.style.cursor = "pointer"
});

botonAyuda.on("pointerout", () => {
    this.game.canvas.style.cursor = "default";
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
