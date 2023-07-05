export default class Intro extends Phaser.Scene {
  constructor() {

      super("intro");
  }

  init() {}

  preload () {
  }

  create () {

    const sonidoSeleccion = this.sound.add("seleccionMenu");

    this.cameras.main.setBackgroundColor('#ffffff');

    this.introduccion = this.add.sprite(400, 300, "animacionintro").setScale(0.95);

    const botonJugar = this.add.image(700, 550, 'botonPlay').setScale(0.7).setInteractive();
    
    this.anims.create({
      key: "animacion",
      frames: this.anims.generateFrameNumbers("animacionintro", { start: 0, end: 3 }),
      frameRate: 100,
      repeat: 0, 
    }); 

    this.introduccion.play("animacion");



    botonJugar.on("pointerover", () => {
      this.game.canvas.style.cursor = "pointer"
  });

  botonJugar.on("pointerout", () => {
      this.game.canvas.style.cursor = "default";
  });
  
  botonJugar.on("pointerdown", () => {
      this.game.canvas.style.cursor = "default";
      sonidoSeleccion.play();
      this.scene.start("etapa1inicio");
  });

  }

  update () {


  }

}