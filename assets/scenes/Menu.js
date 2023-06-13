  export default class Menu extends Phaser.Scene {
    constructor() {

      super("menu");
    }

  preload() {

  }

  create() {

    this.add.image(400, 300, "fondo");
    this.add.image(400,300, "ladrillos");
    this.add.image(400,300, "pelo");
    this.add.image(400,300, "titulo");

    const botonJugar = this.add.image(305, 400, 'botonPlay').setScale(0.9).setInteractive();
    const botonAyuda = this.add.image(750, 50, 'botonAyuda').setScale(1).setInteractive();

    //comenzar el juego

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

//ir a la escena de ayuda

  botonAyuda.on("pointerover", () => {
    this.game.canvas.style.cursor = "pointer"
});

botonAyuda.on("pointerout", () => {
    this.game.canvas.style.cursor = "default";
});

botonAyuda.on("pointerdown", () => {
    this.game.canvas.style.cursor = "default";
    this.scene.start("ayuda");
});
  }


  update() {}

  } 
